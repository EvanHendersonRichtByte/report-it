module.exports = Employee = ({ model, Schema }) => {
  const EmployeeSchema = new Schema({
    name: String,
    username: String,
    password: String,
    level: String,
    telephone: String,
  });
  return (Employee = model("Employee", EmployeeSchema));
};