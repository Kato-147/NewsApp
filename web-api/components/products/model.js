const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductShema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  images:{type:[String]},
  category:{
    name:{type: String},
    description: {type: String},
  },
  category_id: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports =
  mongoose.model("Product", ProductShema) || mongoose.models.Product;
