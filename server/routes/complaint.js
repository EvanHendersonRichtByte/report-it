module.exports = (app) => {
  app.post("/complaint", (req, res) => {
    Complaint.create(req.body, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.get("/complaint", (req, res) => {
    Complaint.find({}, (err, complaints) => {
      try {
        res.send(complaints);
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.get("/complaint/:id", (req, res) => {
    Complaint.find({ _id: req.params.id }, (err, complaints) => {
      try {
        res.send(complaints);
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.put("/complaint/:id", (req, res) => {
    Complaint.updateOne({ _id: req.params.id }, req.body, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.delete("/complaint/:id", (req, res) => {
    Complaint.deleteOne({ _id: req.params.id }, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
};
