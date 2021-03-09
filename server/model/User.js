module.exports = User = ({ model, Schema }) => {
  const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: { type: String, unique: true },
    telephone: String,
    level: { type: String, default: "User" },
  });
  return (User = model("User", UserSchema));
};
