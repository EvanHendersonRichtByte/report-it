module.exports = (app, handler) => {
  app.post("/user", (req, res) => {
    User.create(req.body, () => {
      handler(res, "Registered!", "Register failed");
    });
  });
  app.get("/user", (req, res) => {
    User.find({}, (err, data) => {
      handler(res, data, "Failed when getting users");
    });
  });
  app.get("/user/:id", (req, res) => {
    User.findById(req.params.id, (err, data) => {
      handler(res, data, "Failed when getting user data");
    });
  });
  app.put("/user/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body, (err, data) => {
      handler(res, "user has been updated!", "Failed when updating user data");
    });
  });
  app.delete("/user/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err, data) => {
      handler(res, "user has been deleted!", "Failed when deleting user data");
    });
  });
};
