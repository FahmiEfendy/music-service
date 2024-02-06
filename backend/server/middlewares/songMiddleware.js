const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "song") {
      cb(null, "uploads/song/");
    } else if (file.fieldname === "albumCover") {
      cb(null, "uploads/albumCover/");
    }
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
