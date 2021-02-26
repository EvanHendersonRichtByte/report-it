module.exports = (app) => {
  app.post("/employee", (req, res) => {
    Employee.create(req.body, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.get("/employee", (req, res) => {
    Employee.find({}, (err, employee) => {
      try {
        res.send(employee);
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.get("/employee/:id", (req, res) => {
    Employee.find({ _id: req.params.id }, (err, employee) => {
      try {
        res.send(employee);
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.put("/employee/:id", (req, res) => {
    Employee.updateOne({ _id: req.params.id }, req.body, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
  app.delete("/employee/:id", (req, res) => {
    Employee.deleteOne({ _id: req.params.id }, () => {
      try {
        res.send("Operation Success");
      } catch (err) {
        res.send("Operation Failed");
      }
    });
  });
};
