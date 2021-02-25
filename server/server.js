let { devPort, mongodbURI } = require("./config.json"),
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

app.get("/", (req, res) => {
  res.send("hola amigos");
});

app.listen((devPort = process.env.PORT || devPort), () => {
  console.log(`Server running on port ${devPort}`);
});
