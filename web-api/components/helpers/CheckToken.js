const jwt = require("jsonwebtoken");

//kiểm tra token
const checkToken = (req, res, next) => {
  try {
    //đọc token từ req headers
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Không tìm thấy token");
    } else {
      //giải mã token
      jwt.verify(token, "ailopdupacpac", (error, decoded) => {
        if (error) {
          throw new Error("Token không hợp lệ");
        } else {
          //lưu thông tin giải mã vào req, dùng cho các xử lý ở sau
          req.user = decoded;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error });
  }
};

module.exports = checkToken;
