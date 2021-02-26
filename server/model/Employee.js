module.exports = Employee = (mongoose, Schema) => {
  mongoose.model(
    "Employee",
    new Schema({
      employee_id: { type: String, default: mongoose.Types.ObjectId() },
      name: String,
      username: String,
      password: String,
      level: String,
      telephone: String,
    })
  );
};
