const multer = require("multer");

//upload ảnh/file/word, exl. pdf
//lưu vào thư mục public/images (ổ cứng)
const storage = multer.diskStorage({
  //chỗ lưu file
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  //tạo tên file
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

module.exports = multer({ storage: storage });
