const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, require: true },
  token: { type: String, require: true },
  created_at: { type: Date, default: Date.now }, //thời gian tạo token
  status: { type: Boolean, default: true }, //trạng thái token, được sử dụng hay chưa
});

module.exports =
  mongoose.model("PasswordReset", UserSchema) || mongoose.models.PasswordReset;
