Response = ({ model, Schema }) => {
  const ResponseSchema = new Schema({
    response_date: { type: Date, default: Date.now() },
    response_text: String,
    employee_id: Number,
  });
  return (Response = model("Response", ResponseSchema));
};

module.exports = Response;
