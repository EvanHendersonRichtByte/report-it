// const { upload, gfs } = require("../middleware/upload");

const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const { mongodbURI } = require("../config/config.json");
const { response } = require("express");

// REFACTOR ???
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
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-attachment-${file.originalname}`;
      const fileInfo = { filename, bucketName: "attachment" };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

module.exports = (app, handler) => {
  app.post("/complaint", upload.single("attachment"), (req, res) => {
    if (req.file) {
      req.body.attachment_id = String(req.file.id);
      req.body["attachment"] = req.file.filename;
    }
    Complaint.create(req.body, (err) => handler(res, "Complaint created", err));
  });

  app.get("/image/:filename", (req, res) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
  });

  app.get("/complaint", (req, res) => {
    Complaint.find({})
      .populate("author")
      .populate({
        path: "response",
        populate: { path: "user_id" },
      })
      .exec((err, complaints) => {
        handler(res, complaints, err);
      });
  });

  app.get("/complaint/:id", (req, res) => {
    Complaint.findOne({ _id: req.params.id }, (err, complaints) =>
      handler(res, complaints, err)
    );
  });

  app.put("/complaint/:id", (req, res) => {
    Complaint.updateOne({ _id: req.params.id }, req.body, () =>
      handler(res, "Complaint updated", "Cannot update complaint data")
    );
  });

  app.delete("/complaint/:id", (req, res) => {
    Complaint.findOne({ _id: req.params.id }, (err, { attachment_id }) => {
      if (attachment_id !== "x") {
        Complaint.deleteOne({ _id: req.params.id }, () => {
          gfs.delete(
            new mongoose.Types.ObjectId(attachment_id),
            (err, data) => {
              if (err) return res.status(404).json({ err: err.message });
            }
          );
          handler(res, "Complaint deleted", "Cannot delete complaint data");
        });
      } else {
        Complaint.deleteOne({ _id: req.params.id }, () => {
          handler(res, "Complaint deleted", "Cannot delete complaint data");
        });
      }
    });
  });
};
