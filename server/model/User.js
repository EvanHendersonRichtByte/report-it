module.exports = User = ({ model, Schema }) => {
  const UserSchema = new Schema({
    assigned_report: { type: Schema.Types.ObjectId, ref: "Complaint" },
    name: String,
    username: String,
    password: String,
    email: { type: String, unique: true },
    telephone: String,
    level: { type: String, default: "User" },
  });
  return (User = model("User", UserSchema));
};
