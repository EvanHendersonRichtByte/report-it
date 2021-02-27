module.exports = (app, handler) => {
  app.post("/response", (req, res) => {
    Response.create(req.body, (response) => {
      handler(res, response, "Failed");
    });
  });
  app.get("/response", (req, res) => {
    Response.find({}, (err, response) => {
      handler(res, response, "Failed to get response");
    });
  });
  app.get("/response/:id", (req, res) => {
    Response.find({ _id: req.params.id }, (err, response) => {
      handler(res, response, "Failed to get individual response");
    });
  });
  app.put("/response/:id", (req, res) => {
    Response.updateOne({ _id: req.params.id }, req.body, () => {
      handler(res, "Response Updated", "Failed to update individual response");
    });
  });
  app.delete("/response/:id", (req, res) => {
    Response.deleteOne({ _id: req.params.id }, () => {
      handler(
        res,
        "Response has been deleted",
        "Failed to delete individual response"
      );
    });
  });
};
