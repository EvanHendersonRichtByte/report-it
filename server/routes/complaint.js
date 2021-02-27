module.exports = (app, handler) => {
  app.post("/complaint", (req, res) => {
    Complaint.create(req.body, () => handler(res, "Success", "Failed"));
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
