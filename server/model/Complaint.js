module.exports = Complaint = ({ model, Schema }) => {
  const ComplaintSchema = new Schema({
    user_id: String,
    complaint_date: { type: Date, default: Date.now() },
    complaint_text: String,
    photo: String,
    status: String,
  });
  return (Complaint = model("Complaint", ComplaintSchema));
};
