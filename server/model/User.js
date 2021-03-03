module.exports = User = ({ model, Schema }) => {
  const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: { type: String, unique: true },
    telephone: String,
  });
  return (User = model("User", UserSchema));
};
