let { mongodbURI } = require("./config.json"),
  mongoose = require("mongoose");

// Database Connection
const conn = mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { mongoose, conn };
