module.exports = Complaint = ({ model, Schema }) => {
  const ComplaintSchema = new Schema({
    user_id: String,
    title: String,
    description: String,
    complaint_date: { type: Date, default: Date.now() },
    city: String,
    destInstance: String,
    attachment: String,
    status: { type: String, default: "Pending" },
  });
  return (Complaint = model("Complaint", ComplaintSchema));
};
