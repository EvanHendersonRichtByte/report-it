module.exports = (app) => {
  app.post("/user", (req, res) => {
    User.create(req.body, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.get("/user", (req, res) => {
    User.find({}, (err, data) => {
      try {
        res.send(data);
      } catch (err) {
        console.log(err);
      }
    });
  });
  app.get("/user/:id", (req, res) => {
    User.findById(req.params.id, (err, data) => {
      try {
        res.send(data);
      } catch (err) {
        console.log(err);
      }
    });
  });
  app.put("/user/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body, (err, data) => {
      try {
        res.send(data);
      } catch (err) {
        console.log(err);
      }
    });
  });
  app.delete("/user/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err, data) => {
      try {
        res.send("Operation Success");
      } catch (err) {
        throw err;
      }
    });
  });
};
