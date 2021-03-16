module.exports = Complaint = ({ model, Schema }) => {
  const ComplaintSchema = new Schema({
    user_id: String,
    employee_id: { type: String, default: null },
    title: String,
    description: String,
    complaint_date: { type: Date, default: Date.now() },
    city: String,
    destInstance: String,
    attachment_id: String,
    attachment: String,
    status: { type: String, default: "Pending" },
  });
  return (Complaint = model("Complaint", ComplaintSchema));
};
