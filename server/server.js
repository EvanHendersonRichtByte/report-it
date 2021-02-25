const { devPort, mongodbURI } = require("./config.json"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();

mongoose.createConnection(
  mongodbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    try {
      console.log("Connected to Database!");
    } catch (error) {
      throw error;
    }
  }
);

app.listen(devPort, () => {
  console.log(`Server running on port ${devPort}`);
});
