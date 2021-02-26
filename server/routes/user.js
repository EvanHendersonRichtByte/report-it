module.exports = (app) => {
  app.post("/user", (req, res) => {
    res.send("Create User");
  });
  app.get("/user", (req, res) => {
    res.send("Get all users");
  });
  app.get("/user/:id", (req, res) => {
    res.send("Show individual user");
  });
  app.put("/user/:id", (req, res) => {
    res.send("Update individual user");
  });
  app.delete("/user/:id", (req, res) => {
    res.send("Delete individual user");
  });
};
