const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const token = (payload) => {
  return jwt.sign({ payload }, "okegan");
};

module.exports = (app, handler) => {
  app.post("/user", (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        req.body.password = hash;
        User.findOne({ email: req.body.email }, (err, user) => {
          if (!user) {
            User.create(req.body, (err, data) => {
              handler(res, { token: token(data._id), id: data._id }, err);
            });
          } else res.send("Email already taken");
        });
      });
    });
  });
  app.get("/user", (req, res) => {
    User.find({}, (err, data) => {
      handler(res, data, "Failed when getting users data");
    });
  });
  app.post("/user/auth", (req, res) => {
    User.findOne({ email: req.body.email }, (err, data) => {
      if (data) {
        let credentialStatus = "";
        bcrypt.compare(req.body.password, data.password, (err, success) => {
          success
            ? (credentialStatus = "Verified")
            : (credentialStatus = "Unverified");
          handler(
            res,
            { credentialStatus, token: token(data._id), id: data._id },
            err
          );
        });
      } else res.send("We are unable to find your data");
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
  app.get("/user/:id/complaint", (req, res) => {
    Complaint.find({ user_id: req.params.id }, (err, data) => {
      handler(res, data, err);
    });
  });
};
