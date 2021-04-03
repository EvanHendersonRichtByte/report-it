const { conn } = require("../config/db");
module.exports = Response = ({ model, Schema }) => {
  const ResponseSchema = new Schema({
    complaint_id: String,
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    response_text: String,
    response_date: { type: Date, default: Date.now() },
  });
  return (Response = conn.model("Response", ResponseSchema));
};
