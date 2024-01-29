var express = require("express");
var router = express.Router();
const UserController = require("../components/user/controller");
const checkToken = require("../components/helpers/CheckToken");
const checkRole = require("../components/helpers/CheckRole");
// http:/localhost:8686/users

/**
 * http:/localhost:8686/users/login
 * method: POST
 * đăng nhập bằng email và password
 */

router.post("/login", async (req, res, next) => {
  try {
    const body = req.body;
    const user = await UserController.login(body);
    res.status(200).json({ succes: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, error: error });
  }
});

/**
 * http:/localhost:8686/users/register
 * method: POST
 * đăng ký bằng email và password
 */

router.post("/register", async (req, res, next) => {
  try {
    const body = req.body;
    await UserController.register(body);
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        { succes: false, error: error },
        { message: "Đăng ký thất bại: ./routes/users" }
      );
  }
});

/**
 * http:/localhost:8686/users/update-profile
 * method: POST
 * cập nhật thông tin cá nhân
 */

/**
 * http:/localhost:8686/users/logout
 * method: GET
 * đăng xuất
 */

/**
 * http:/localhost:8686/users/change-password
 * method: POST
 * cập nhật mật khẩu
 */

//api test token
//http://localhost:8686/users/test-token
//method: GET
//authentication: Chứng thực
//authorization: phân quyền
router.get(
  "/test-token",
  [checkToken, checkRole.checkRoleManager],
  (req, res, next) => {
    try {
      console.log("========>: ", req.user);
      res.status(200).json({ succes: true, message: "thành công" });
    } catch (error) {
      res.status(401).json({ succes: true, message: "không thành công" });
    }
  }
);

/**
 * http://locahost:8686/users/verify/:id
 * method: POST
 * xác thực tài khoản
 */

router.post("/verify/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserController.verify(id);
    res.status(200).json({ status: result });
  } catch (error) {
    res.status(500).json({ status: false, error: error });
  }
});

/**
 * http://locahost:8686/users/forgot-password
 * method: POST
 * quên mật khẩu
 */
router.post('/forgot-password', async(req, res, next)=>{
  try {
    const {email} = req.body;
    const result = await UserController.forgotPassword(email);
    res.status(200).json({status: result});
  } catch (error) {
    res.status(500).json({status: false, error: error});
  }
})

/**
 * http://locahost:8686/users/check-token-reset-password
 * method: POST
 * kiểm tra token của reset password
 */

router.post('check-token-reset-password', async(req,res, next)=>{
  try {
    const {token} = req.body;
    const result = await UserController.checkTokenResetPassword(token);
    res.status(200).json({status: result});
  } catch (error) {
    res.status(500).json({status : false, error: error});
  }
});

module.exports = router;
