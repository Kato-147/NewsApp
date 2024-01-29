const UserModel = require("./model");
//mã hóa mật khẩu
const bcryptjs = require("bcryptjs");
//tạo token
const jwt = require("jsonwebtoken");
//gửi mail
const Mailer = require("../helpers/Mailer");

const PasswordResetModel = require("./modelPR");

//đăng ký
const register = async (data) => {
  try {
    const { email, password, name, role } = data;

    //mã hóa mật khẩu
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const user = new UserModel({ email, password: hashPassword, name, role });
    await user.save();
    //gửi email xác thực tài khoản
    setTimeout(() => {
      Mailer.sendMail({
        email: user.email,
        subject: "Xác thực tài khoản",
        content: `Link xác thực tài khoản: http://localhost:3000/verify-user/${user._id}`,
      });
    }, 0);
  } catch (error) {
    console.log(error);
    throw new Error("Có lỗi xảy ra khi đăng ký: ./user/controller");
  }
};

//đăng nhập
const login = async (data) => {
  try {
    const { email, password } = data;
    let user = await UserModel.findOne({ email });
    if (!user) throw new Error("Không tìm thấy tài khoản");
    //kiểm tra mật khẩu bằng bcryptjs
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) throw new Error("Mật khẩu không chính xác");
    //xóa filed password
    delete user._doc.password;

    //tạo token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role }, //thông tin lưu vào token
      "ailopdupacpac", //mã hóa ra chuỗi token //JWT_SECRET
      { expiresIn: 60 * 60 } // thời gian hết hạn 'phút*giây'
    );
    user = { ...user._doc, token };
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Có lỗi xảy ra khi đăng nhập: ./user/controller");
  }
};

//xác thực tài khoản
const verify = async (id) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("Tài khoản đã được xác thực");
    user.isVerified = true;
    await user.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//quên mật khẩu
const forgotPassword = async (email) => {
  try {
    //tìm user theo email
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Không tìm thấy tài khoản");
    //tạo token
    const token = jwt.sign(
      { _id: user._id, email: user.email }, //thông tin lưu vào token
      "abc",
      { expiresIn: 1 * 1 * 1 * 60 } // thời gian hết hạn
    );
    //lưu token và email vào db
    const passwordReset = new PasswordResetModel({ email, token });
    await passwordReset.save();
    //gửi mail khôi phục mật khẩu
    setTimeout(() => {
      Mailer.sendMail({
        email: user.email,
        subject: "Khôi phục mật khẩu",
        content: `Link khôi phục mật khẩu: http://localhost:3000/reset-password/${token}`,
      });
    }, 0);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//check token reset password
const checkTokenResetPassword = async (token) => {
  try {
    const decoded = jwt.verify(token, "abc");
    if (decoded) {
      const { email } = decoded;
      const passwordReset = await PasswordResetModel.findOne({
        email,
        token,
        status: true,
        created_at: { $gte: new Date(Date.now() - 1 * 1 * 5 * 60 * 1000) },
      });
      if (passwordReset) return true;
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

// reset password
const resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, "abc");
    if (!decoded) throw new Error("Token không hợp lệ");
    const { email } = decoded;
    const passwordReset = await PasswordResetModel.findOne({
      email,
      token,
      status: true,
      created_at: { $gte: new Date(Date.now() - 1 * 1 * 5 * 60 * 1000) },
    });
    if (!passwordReset) throw new Error("Token không hợp lệ ");

    //mã hóa mật khẩu
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    // lưu vào db mật khẩu mới
    const user = await UserModel.findOne({ email });
    user.password = hashPassword;
    await user.save();
    //xóa token
    await PasswordResetModel.updateOne({ email, token }, { status: false });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  register,
  login,
  verify,
};
