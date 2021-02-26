User = ({ model, Schema }) => {
  const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    telephone: String,
  });
  return (User = model("User", UserSchema));
};

module.exports = User;
