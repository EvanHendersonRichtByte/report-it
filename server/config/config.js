let { devPort } = require("./config.json"),
  express = require("express"),
  app = express();

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static("public"));

app.listen((devPort = process.env.PORT || devPort), () => {
  console.log('\x1b[34m%s\x1b[0m', `Server running on port ${devPort}`);  
});

module.exports = { app };
