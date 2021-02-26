module.exports = Users = (mongoose, Schema) => {
  mongoose.model(
    "Users",
    new Schema({
      user_id: { type: String, default: mongoose.Types.ObjectId() },
      name: String,
      username: String,
      password: String,
      email: String,
      telephone: String,
    })
  );
};
