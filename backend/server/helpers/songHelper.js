const fs = require("fs");
const _ = require("lodash");
const Boom = require("boom");

const db = require("../../models");
const generalHelper = require("./generalHelper");

const fileName = "server/helpers/songHelper.js";

const getSongList = async () => {
  try {
    const data = await db.Song.findAll();

    console.log([fileName, "GET All Song", "INFO"]);

    return Promise.resolve(data);
  } catch (err) {
    console.log([fileName, "GET All Song", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getSongDetail = async (objectData) => {
  const { id } = objectData;

  try {
    const data = await db.Song.findOne({ where: { id: id } });

    if (_.isEmpty(data)) {
      throw Boom.notFound(`Song with id of ${id} does not exist!`);
    }

    console.log([fileName, "GET Song Detail", "INFO"]);

    return Promise.resolve(data);
  } catch (err) {
    console.log([fileName, "GET Song Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const postCreateSong = async (objectData) => {
  const { id, username, title, genre, song, albumCover } = objectData;

  try {
    const selectedArtist = await db.User.findOne({
      where: { id, username, role: "artist" },
    });

    if (_.isEmpty(selectedArtist)) {
      throw Boom.unauthorized("You Have No Access to Add a Song!");
    }

    const songExist = await db.Song.findOne({
      where: { title, singer: selectedArtist.fullname },
    });

    if (songExist) {
      throw Boom.badData(
        `Song with title ${title} and singer ${selectedArtist.fullname} already exist!`
      );
    }

    const songList = await getSongList();

    const newData = db.Song.build({
      id: `song-${songList.length + 1}`,
      singer: selectedArtist.fullname,
      title,
      genre,
      originalName: song.originalname,
      mimeType: song.mimetype,
      size: song.size,
      path: song.path,
      albumCoverPath: albumCover.path,
      user_id: selectedArtist.id,
    });

    await newData.save();

    console.log([fileName, "POST Create Song", "INFO"]);

    return Promise.resolve(newData);
  } catch (err) {
    console.log([fileName, "POST Create Song", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const patchUpdateSong = async (objectData) => {
  const { id, username, song_id, title, genre } = objectData;

  try {
    const selectedArtist = await db.User.findOne({
      where: { id, username, role: "artist" },
    });

    if (_.isEmpty(selectedArtist)) {
      throw Boom.unauthorized("You have no access to edit this song!");
    }

    const selectedSong = await db.Song.findOne({ where: { id: song_id } });

    if (_.isEmpty(selectedSong)) {
      throw Boom.notFound(`Song with id of ${song_id} does not exist!`);
    }

    selectedSong.title = title || selectedSong.title;
    selectedSong.genre = genre || selectedSong.genre;

    await selectedSong.save({
      fields: ["title", "genre"],
    });

    await selectedSong.reload();

    console.log([fileName, "PATCH Update Song", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "PATCH Update Song", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const deleteRemoveSong = async (objectData) => {
  const { id, username, song_id } = objectData;

  try {
    const selectedArtist = await db.User.findOne({
      where: { id, username, role: "artist" },
    });

    if (_.isEmpty(selectedArtist)) {
      throw Boom.unauthorized("You have no access to delete this song!");
    }

    const selectedSong = await db.Song.findOne({
      where: { id: song_id },
    });

    if (_.isEmpty(selectedSong)) {
      throw Boom.notFound(`Song with id of ${song_id} not found!`);
    }

    await db.Song.destroy({ where: { id: song_id } });
    fs.unlinkSync(selectedSong.path);
    fs.unlinkSync(selectedSong.albumCoverPath);

    console.log([fileName, "DELETE Remove Song", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE Remove Song", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = {
  getSongList,
  getSongDetail,
  postCreateSong,
  patchUpdateSong,
  deleteRemoveSong,
};
