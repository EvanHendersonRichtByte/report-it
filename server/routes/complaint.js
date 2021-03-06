const multer = require("multer");
const path = require("path");
const fs = require("fs");
module.exports = (app, handler) => {
  const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage }).single("attachment");
  app.post("/complaint", (req, res) => {
    upload(req, res, (err) => {
      req.body.attachment = req.file.filename;
      Complaint.create(req.body, () => handler(res, "Success", "Failed"));
    });
  });
  app.get("/complaint", (req, res) => {
    Complaint.find({}, (err, complaints) => handler(res, complaints, err));
  });
  app.get("/complaint/:id", (req, res) => {
    Complaint.find({ _id: req.params.id }, (err, complaints) =>
      handler(res, complaints, err)
    );
  });
  app.put("/complaint/:id", (req, res) => {
    Complaint.updateOne({ _id: req.params.id }, req.body, () =>
      handler(res, "Complaint updated", "Cannot update complaint data")
    );
  });
  app.delete("/complaint/:id", (req, res) => {
    Complaint.deleteOne({ _id: req.params.id }, () =>
      handler(res, "Complaint deleted", "Cannot delete complaint data")
    );
  });
};
