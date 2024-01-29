const CategoryModel = require("./model");
const ProductModel = require('../products/model');

//lấy danh sách danh mục
const getAll = async () => {
  try {
    //select * from categories
    const categories = await CategoryModel.find({}, "name");
    return categories;
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Có lỗi bên Category controller rồi đại vương ơi <3");
  }
};

//lấy chi tiết 1 danh mục theo id
const getOneById = async (id) => {
  try {
    const category = await CategoryModel.findById(id);
    return category;
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Có lỗi lấy danh mục theo id <3");
  }
};

//thêm mới 1 danh mục
const addNew = async (data) => {
  try {
    const { name, description } = data;
    const category = new CategoryModel({ name, description });
    await category.save();
  } catch (error) {
    console.log(error);
    throw new Error("Thêm mới kh thành công: controller");
  }
};

//cập nhật theo id
const updateById = async (id, data) => {
  try {
    const { name, description } = data;
    const category = await CategoryModel.findById(id);
    if (category) {
      category.name = name;
      category.description = description;
      const result = await category.save();
      return result;
    }
    throw new Error(
      "Lỗi không tìm thấy danh mục để cập nhật: ./categories/controller"
    );
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi cập nhật không thành công: ./categories/controller");
  }
};

//xóa danh mục theo id
const deleteById = async(id)=>{
    try {
      //kiểm tra được phép
      const products = await ProductModel.find({category_id : id})
      if(products.length >0){
        throw new Error('Xóa không thành công :./categories/controller')
      }
        await CategoryModel.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error('Xóa không thành công :./categories/controller')
    }
}

module.exports = {
  getAll,
  getOneById,
  addNew,
  updateById,
  deleteById,
};
