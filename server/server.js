const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  { mongodbURI, devPort } = require("./config.json"),
  db = mongoose;
mongoose.createConnection(mongodbURI, (err) => {
  if (err) throw err;
  else {
    console.log("connected to database!");
  }
});
app.listen(devPort, () => {
  console.log(`Server running on port ${devPort}`);
});
