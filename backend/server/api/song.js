const fs = require("fs");
const Router = require("express").Router();

const songHelper = require("../helpers/songHelper");
const uploadMedia = require("../middlewares/uploadMedia");
const validationHelper = require("../helpers/validationHelper");
const userMiddleware = require("../middlewares/userMiddleware");

const songList = async (req, res) => {
  try {
    const response = await songHelper.getSongList();

    res
      .status(200)
      .send({ message: "Successfully Get All Songs", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const songDetail = async (req, res) => {
  try {
    validationHelper.idValidation(req.params);

    const response = await songHelper.getSongDetail(req.params);

    res.status(200).send({
      message: `Successfully Get Song Detail with id of ${req.params.id}`,
      data: response,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createSong = async (req, res) => {
  try {
    const validateData = {
      title: req.body.title,
      genre: req.body.genre,
      song: req?.files?.song[0],
      songCover: req?.files?.songCover[0],
    };

    const objectData = {
      ...req.body,
      song: req?.files?.song[0],
      songCover: req?.files?.songCover[0],
    };

    validationHelper.songRequestValidation(validateData);

    const response = await songHelper.postCreateSong(objectData);

    res
      .status(201)
      .send({ message: "Successfully Create New Song", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateSong = async (req, res) => {
  const { id: song_id } = req.params;
  const { id, username, title, genre } = req.body;
  // TODO: Update Album Cover

  const objectData = {
    id,
    username,
    song_id,
    title,
    genre,
  };

  try {
    const validateData = {
      title: req.body.title,
      genre: req.body.genre,
    };

    validationHelper.idValidation({ id: song_id });
    validationHelper.songRequestValidation(validateData, true);

    const response = await songHelper.patchUpdateSong(objectData);

    res
      .status(200)
      .send({ message: "Successfully Update a Song", data: response });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const removeSong = async (req, res) => {
  try {
    const objectData = {
      id: req.body.id,
      username: req.body.username,
      song_id: req.params.id,
    };

    validationHelper.idValidation(req.params);

    await songHelper.deleteRemoveSong(objectData);

    res.status(200).send({ message: "Successfully Deleted a Song" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

Router.get("/", songList);
Router.get("/detail/:id", songDetail);
Router.post(
  "/create",
  uploadMedia.fields([
    { name: "song", maxCount: 1 },
    { name: "songCover", maxCount: 1 },
  ]),
  userMiddleware.tokenValidation,
  createSong
);
Router.patch("/update/:id", userMiddleware.tokenValidation, updateSong);
Router.delete("/remove/:id", userMiddleware.tokenValidation, removeSong);

module.exports = Router;
