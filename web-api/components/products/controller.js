const ProductModel = require("./model");

//lấy danh sách sản phẩm

const getAll = async (size, page) => {
  try {
    size = size ? parseInt(size) : 10;
    page = page ? parseInt(page) : 1;
    const skip = (page - 1) * size; //bỏ qua bao nhiêu sản phẩm đầu tiên

    //quẻy
    let query = {};
    //lấy sản phẩm có tên là iphone
    //select * from products where name = 'iphone' and price = 10
    //query = {name:'iphone', price: 10};
    //lấy sản phẩm có giá trị lướn hơn 50 hoặc số lượng nhỏ hơn 100
    //seclect * from products where price > 50 or quantity <100
    // query = { $or: [{ price: { $gt: 50 } }, { quantity: { $lt: 100 } }] };

    //const product = await ProductModel.find({}).skip(skip).limit(size);
    const product = await ProductModel.find({});
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("lấy danh sách sản phẩm thất bại: ./product/controller");
  }
};

//lấy chi tiết 1 sản phẩm theo id

const getById = async (id) => {
  try {
    const product = await ProductModel.findById(id);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy chi tiết sản phẩm thất bại: ./product/controller");
  }
};

//tìm sản phẩm theo tên

const searchByName = async (name) => {
  try {
    //select * from products where name like '%iphone%'
    const products = await ProductModel.find({
      name: { $regex: name, $options: "i" },
    });
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Tìm sản phẩm theo tên thất bại: ./product/controller");
  }
};

//thêm sản phẩm

const add = async (data) => {
  try {
    const { name, price, quantity, description, image, category_id } = data;
    const product = new ProductModel({
      name,
      price,
      quantity,
      description,
      image,
      category_id,
    });
    await product.save();
  } catch (error) {
    console.log(error);
    throw new Error("Thêm mới sản phẩm thất bại: ./products/controller");
  }
};

//sửa sản phẩm theo id

const update = async (id, data) => {
  try {
    const { name, price, quantity, description, image, category_id } = data;
    const product = await ProductModel.findById(id);
    if (!product)
      throw new Error("Không tìm thấy sản phẩm: ./products/controller");
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category_id = category_id || product.category_id;
    await product.save();
    return product;
  } catch (error) {
    throw new Error("Sửa sản phẩm thất bại: ./products/controller");
  }
};
//không hiểu thì xem lại video 9-11 nodejs 1:15
//xóa sản phẩm theo id

const remove = async (id) => {
  try {
    await ProductModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Xóa sản phẩm thất bại: ./products/controller");
  }
};

module.exports = {
  getAll,
  getById,
  searchByName,
  add,
  update,
  remove,
};
