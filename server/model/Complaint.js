module.exports = Complaint = (mongoose, Schema) => {
  mongoose.model(
    "Complaint",
    new Schema({
      complaint_id: { type: String, default: mongoose.Types.ObjectId() },
      user_id: String,
      complaint_date: { type: Date, default: Date.now() },
      complaint_text: String,
      photo: String,
      status: String,
    })
  );
};
