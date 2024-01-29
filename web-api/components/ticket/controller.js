const TicketModel = require("./model");

//lấy danh sách vé

const getAll = async (size, page) => {
  try {
    size = size ? parseInt(size) : 10;
    page = page ? parseInt(page) : 1;
    const skip = (page - 1) * size; //bỏ qua bao nhiêu vé đầu tiên

    //const product = await ProductModel.find({}).skip(skip).limit(size);
    const ticket = await TicketModel.find({});
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("lấy danh sách vé thất bại: ./ticket/controller");
  }
};

//lấy chi tiết 1 vé theo id

const getById = async (id) => {
  try {
    const ticket = await TicketModel.findById(id);
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy chi tiết vé thất bại: ./ticket/controller");
  }
};

//thêm vé

const add = async (data) => {
  try {
    const { nameUser, nameMovie, quantity,chair } = data;
    const ticket = new TicketModel({
      nameUser,
      nameMovie,
      quantity,
      chair,
    });
    await ticket.save();
  } catch (error) {
    console.log(error);
    throw new Error("Thêm mới sản vé bại: ./ticket/controller");
  }
};

//sửa vé theo id

const update = async (id, data) => {
  try {
    const { nameUser, nameMovie, quantity } = data;
    const ticket = await TicketModel.findById(id);
    if (!ticket) throw new Error("Không tìm thấy vé: ./ticket/controller");
    ticket.nameUser = nameUser || ticket.nameUser;
    ticket.nameMovie = nameMovie || ticket.nameMovie;
    ticket.quantity = quantity || ticket.quantity;
    ticket.chair = chair || ticket.chair;

    await product.save();
    return ticket;
  } catch (error) {
    throw new Error("Sửa vé thất bại: ./ticket/controller");
  }
};

//xóa vé theo id

const remove = async (id) => {
  try {
    await TicketModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Xóa vé thất bại: ./products/controller");
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
