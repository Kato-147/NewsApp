//1: user
//2: manager
//3:admin

const checkRoleManager = (req, res, next) => {
  try {
    const { user } = req;
    if (user.role < 2) {
      throw new Error("Bạn không có quyền truy cập");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Bạn không có quyền truy cập" });
  }
};

const checkRoleAdmin = (req, res, next) => {
  try {
    const { user } = req;
    if (user.role < 3) {
      throw new Error("Bạn không có quyền truy cập");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Bạn không có quyền truy cập" });
  }
};

module.exports = { checkRoleManager, checkRoleAdmin };
