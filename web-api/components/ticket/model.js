const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TicketShema = new Schema({
  nameUser: { type: String, required: true },
  nameMovie: { type: String, required: true },
  quantity: { type: Number, required: true },
  chair: { type: Number, require: true },
  //   category:{
  //     name:{type: String},
  //     description: {type: String},
  //   },
  //category_id: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports =
  mongoose.model("Ticket", TicketShema) || mongoose.models.Ticket;
