module.exports = (app, handler, auth) => {
  app.post("/api/employee", (req, res) => {
    Employee.create(req.body, () =>
      handler(res, "Employee Added!", "Failed when adding employee")
    );
  });
  app.get("/api/employee", (req, res) => {
    Employee.find({}, (err, employee) => {
      handler(res, employee, "Failed when getting employee data");
    });
  });
  app.get("/api/employee/:id", (req, res) => {
    Employee.find({ _id: req.params.id }, (err, employee) => {
      handler(res, employee, "Failed when getting individual employee data");
    });
  });
  app.put("/api/employee/:id", (req, res) => {
    // console.log(req.body);
    User.updateOne({ _id: req.params.id }, req.body, () => {
      handler(
        res,
        "Employee data updated!",
        "Failed when updating individual employee data"
      );
    });
  });
  app.delete("/api/employee/:id", (req, res) => {
    Employee.deleteOne({ _id: req.params.id }, () => {
      handler(
        res,
        "Deleted Employee",
        "Failed when deleting individual Employee data"
      );
    });
  });
};
