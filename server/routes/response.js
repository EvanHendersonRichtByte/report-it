module.exports = (app) => {
  app.post("/response", (req, res) => {
    Response.create(req.body, (response) => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.get("/response", (req, res) => {
    Response.find({}, (err, response) => {
      try {
        res.send(response);
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.get("/response/:id", (req, res) => {
    Response.find({ _id: req.params.id }, (err, response) => {
      try {
        res.send(response);
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.put("/response/:id", (req, res) => {
    Response.updateOne({ _id: req.params.id }, req.body, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.delete("/response/:id", (req, res) => {
    Response.deleteOne({ _id: req.params.id }, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
};
