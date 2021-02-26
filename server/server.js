const employee = require("./routes/employee");

let { devPort, mongodbURI } = require("./config.json"),
  mongoose = require("mongoose"),
  express = require("express"),
  fs = require("fs"),
  app = express();

app.use(express.urlencoded({ extended: true })).use(express.json());

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

getAllModel = () => {
  const model = fs.readdirSync("./model");
  model.forEach((file) => {
    const modelName = file.slice(0, file.length - 3);
    global[modelName] = require("./model/" + file)(mongoose);
  });
};

getAllRoutes = () => {
  const routes = fs.readdirSync("./routes");
  routes.forEach((file) => {
    require(`./routes/${file}`)(app);
  });
};

(executor = () => {
  getAllModel();
  getAllRoutes();
})();

app.listen((devPort = process.env.PORT || devPort), () => {
  console.log(`Server running on port ${devPort}`);
});
