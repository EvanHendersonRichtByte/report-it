let { devPort, mongodbURI } = require("./config.json"),
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  express = require("express"),
  fs = require("fs"),
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

getAllModel = () => {
  const model = fs.readdirSync("./model");
  model.forEach((file) => {
    const modelName = file.slice(0, file.length - 3);
    global[modelName] = require("./model/" + file);
  });
};

getAllRoutes = () => {
  const routes = fs.readdirSync("./routes");
  routes.forEach((file) => {
    require(`./routes/${file}`)(app);
  });
};

(executor = () => {
  getAllModel(mongoose, Schema);
  getAllRoutes();
})();

app.listen((devPort = process.env.PORT || devPort), () => {
  console.log(`Server running on port ${devPort}`);
});
