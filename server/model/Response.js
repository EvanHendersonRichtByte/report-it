module.exports = Response = ({ model, Schema }) => {
  const ResponseSchema = new Schema({
    complaint_id: String,
    employee_id: String,
    response_text: String,
    response_date: { type: Date, default: Date.now() },
  });
  return (Response = model("Response", ResponseSchema));
};