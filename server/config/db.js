let { mongodbURI } = require("./config.json"),
  mongoose = require("mongoose");

// Database Connection
mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

module.exports = { mongoose };
