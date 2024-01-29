const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserShema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  // mobile: { type: String },
   address: { type: String },
  role:{type:Number},
  isVerified:{type: Boolean, default:false}
});

module.exports = mongoose.model("User", UserShema) || mongoose.models.User;
