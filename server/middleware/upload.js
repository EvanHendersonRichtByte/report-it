const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const { mongodbURI } = require("../config/config.json");
// const { conn } = require("../config/db");
let gfs;

const conn = mongoose.createConnection(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "attachment",
  });
});

const storage = new GridFsStorage({
  url: mongodbURI,
  file: async (req, file) => {
    const filename = `${Date.now()}-attachment-${file.originalname}`;
    return (fileInfo = { filename, bucketName: "attachment" });
  },
});

const upload = multer({ storage });

module.exports = { upload, gfs };
