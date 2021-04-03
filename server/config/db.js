let { mongodbURI } = require("./config.json"),
  mongoose = require("mongoose");
// Database Connection
const conn = mongoose.createConnection(
  mongodbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    else {
      console.log('\x1b[34m%s\x1b[0m', 'Database Connected');  
    }
  }
);

module.exports = { mongoose, conn };
