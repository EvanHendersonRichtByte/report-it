module.exports = User = ({ model, Schema }) => {
  const UserSchema = new Schema({
    assigned_report_id: { type: String, default: null },
    name: String,
    username: String,
    password: String,
    email: { type: String, unique: true },
    telephone: String,
    level: { type: String, default: "User" },
  });
  return (User = model("User", UserSchema));
};
