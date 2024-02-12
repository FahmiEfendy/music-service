const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const request = require("supertest");

const app = require("../../index");
const { User } = require("../../models/index");
const { sequelize } = require("../../models/index");
const { encryptPayload } = require("../../utils/encryptPayload");

const salt = bcrypt.genSaltSync(10);
const { queryInterface } = sequelize;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";
const jwtSecretToken = process.env.JWT_SECRET_TOKEN || "MUSIC_SERVICE_KEY";

const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
};

const userMockData = [
  {
    id: "user-1",
    username: "listener-1",
    fullname: "This is Listener",
    role: "listener",
    password: __hashPassword("listener-1-123"),
  },
  {
    id: "user-2",
    username: "artist-1",
    fullname: "This is Artist",
    role: "artist",
    password: __hashPassword("artist-1-123"),
  },
];

afterAll((done) => {
  queryInterface
    .bulkDelete("Users", null, {})
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

let userUrl;

describe("User", () => {
  beforeEach(() => {
    userUrl = "/api/user";
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Should Success GET All User", (done) => {
    jest.spyOn(User, "findAll").mockResolvedValue(userMockData);

    request(app)
      .get(`${userUrl}/`)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.length).toEqual(2);
        done();
      });
  });

  test("Should Succcess GET User Detail", (done) => {
    const body = {
      id: "user-1",
      username: "listener-1",
    };

    jest.spyOn(User, "findOne").mockImplementation(async (options) => {
      const find = userMockData.find(
        (user) => user.username === options.where.username
      );
      return Promise.resolve(find);
    });

    const token = __generateToken({
      id: body.id,
      username: body.username,
    });

    request(app)
      .get(`${userUrl}/detail`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.id).toEqual("user-1");
        done();
      });
  });

  test("Should Success POST Register", (done) => {
    const body = {
      username: encryptPayload("user-3"),
      fullname: encryptPayload("This Is Listener"),
      role: "listener",
      password: encryptPayload("user-3-123"),
      confirmPassword: encryptPayload("user-3-123"),
    };

    jest.spyOn(User, "findAll").mockResolvedValue(userMockData);

    request(app)
      .post(`${userUrl}/register`)
      .send(body)
      .then((res) => {
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("data");
        done();
      })
      .catch((err) => done(err));
  });

  test("Should Success POST Login", (done) => {
    const body = {
      username: encryptPayload("listener-1"),
      password: encryptPayload("listener-1-123"),
    };

    jest.spyOn(User, "findOne").mockImplementation(async (options) => {
      const find = userMockData.find(
        (user) => user.username === options.where.username
      );
      return Promise.resolve(find);
    });

    request(app)
      .post(`${userUrl}/login`)
      .send(body)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("data");
        done();
      })
      .catch((err) => done(err));
  });
});
