var express = require("express");
var router = express.Router();
const upload = require("../components/helpers/Upload");
//http://localhost:8686/

/**
 * http://localhost:8686/upload-file
 * method: POST
 * upload hình ảnh lên sever
 */

/**
 * midleware
 * bắt lỗi form data
 */

router.post("/upload-file", [upload.single("image")], (req, res, next) => {
 // if (req.file) {
   // const path = req.file.path.replace("public", "");
    //cmd ----> ipconfig ---> ipv4: 192.168..
   // 192.168.137.1
    // 10.82.26.77
    const path = 'http://192.168.1.6:8686/images/' + req.file.filename;
   return res.json({ path: path });
  
});

module.exports = router;
