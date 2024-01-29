const nodemailer = require("nodemailer");
// khai báo thông tin email
const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "chimokato147@gmail.com",
    pass: "enbijvoscnitxijv",
    //enbi jvos cnit xijv
  },
});
const sendMail = async (data) => {
  try {
    const { email, subject, content } = data;
    const mailOptions = {
      from: "chimokato147@gmail.com",
      to: email,
      subject,
      html: content,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Có lỗi xảy ra khi gửi email");
  }
};

module.exports = {
  sendMail,
};
