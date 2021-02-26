module.exports = Response = (mongoose, Schema) => {
  mongoose.model(
    "Response",
    new Schema({
      response_id: { type: String, default: mongoose.Types.ObjectId() },
      response_date: { type: Date, default: Date.now() },
      response_text: String,
      employee_id: Number,
    })
  );
};
