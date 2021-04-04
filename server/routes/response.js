module.exports = (app, handler, auth) => {
  app.post("/response", (req, res) => {
    Response.create(req.body, (err, response) => {
      Complaint.findOne({ _id: response.complaint_id }, (err, responseData) => {
        Complaint.updateOne(
          { _id: response.complaint_id },
          { response: [...responseData.response, response._id] },
          (err, data) => {
            handler(res, data, err);
          }
        );
      });
    });
  });
  app.get("/response", (req, res) => {
    Response.find({}, (err, response) => {
      handler(res, response, "Failed to get response");
    });
  });
  app.get("/response/:complaint_id", (req, res) => {
    Response.find(
      { complaint_id: req.params.complaint_id },
      (err, response) => {
        handler(res, response, "Failed to get individual response");
      }
    );
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
