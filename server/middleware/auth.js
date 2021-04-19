const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const { token, freeaccess } = req.headers;
  if (!freeaccess) {
    if (token) {
      jwt.verify(token, "okegan", (err, { payload: _id }) => {
        if (err) res.status(401).send("Access Denied");
        try {
          User.findOne({ _id }, (err, data) => {
            if (err) res.status(401).send("Access Denied");
            try {
              if (data) {
                next();
              } else {
                if (err) res.status(401).send("Access Denied");
              }
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      res.status(401).send("Access Denied");
    }
  } else {
    next();
  }
};
