const { conn } = require("../config/db");
module.exports = Employee = ({ model, Schema }) => {
  const EmployeeSchema = new Schema({
    name: String,
    username: String,
    password: String,
    level: { type: String, default: "Employee" },
    telephone: String,
  });
  return (Employee = conn.model("Employee", EmployeeSchema));
};
