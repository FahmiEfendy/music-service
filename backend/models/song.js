"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsToMany(models.Playlist, {
        through: "PlaylistSongs",
        foreignKey: "song_id",
        otherKey: "playlist_id",
        as: "playlists",
      });
      Song.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Song.init(
    {
      title: DataTypes.STRING,
      singer: DataTypes.STRING,
      genre: DataTypes.STRING,
      originalName: DataTypes.STRING,
      mimeType: DataTypes.STRING,
      size: DataTypes.NUMBER,
      songUrl: DataTypes.STRING,
      songDuration: DataTypes.STRING,
      songCoverUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
