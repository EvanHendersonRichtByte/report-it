module.exports = Complaint = ({ model, Schema }) => {
  const ComplaintSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    employee_id: { type: String, default: null },
    title: String,
    description: String,
    complaint_date: { type: Date, default: Date.now() },
    city: String,
    destInstance: String,
    attachment_id: String,
    attachment: String,
    finished: { type: Boolean, default: false },
    response: [{ type: Schema.Types.ObjectId, ref: "Response" }],
    status: { type: String, default: "Pending" },
  });
  return (Complaint = model("Complaint", ComplaintSchema));
};
