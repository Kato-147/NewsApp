const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryShema = new Schema({
name:{
    type: String, //kiểu dữ liệu
    require: true, //bắt buộc phải có
   // unique: true, //duy nhất
},
description:{
    type: String,
   // require: true,
}
});

module.exports = mongoose.model('Category', CategoryShema)||mongoose.models.Category;