const responseHandler = require("./handler/responseHandler");
const { mongoose } = require("./config/db");
const { app } = require("./config/config");
const fs = require("fs");
const auth = require("./middleware/auth");
// Dynamic Model Import
getAllModel = () => {
  const model = fs.readdirSync("./model");
  model.forEach((file) => {
    const modelName = file.slice(0, file.length - 3);
    global[modelName] = require("./model/" + file)(mongoose);
  });
};

// Dynamic Route Import
getAllRoutes = () => {
  const routes = fs.readdirSync("./routes");
  routes.forEach((file) => {
    require(`./routes/${file}`)(app, responseHandler, auth);
  });
};

// IIFE Executor
(executor = () => {
  getAllModel();
  getAllRoutes();
})();
