var express = require("express");
var router = express.Router();
const ProductController = require("../components/products/controller");
const validation = require('../components/helpers/Validation');
// http://localhost:8686/products

/**
 * http://localhost:8686/products?size10&page=1
 * method: GET
 * lấy danh sách sản phẩm
 */

router.get("/", async function (req, res, next) {
  try {
    const { size, page } = req.query;
    const products = await ProductController.getAll(size, page);
    return res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi lấy danh sách sản phẩm: ./routes/products" });
  }
});

/**
 *
 *
 * method: GET
 * lấy chi tiết sản phẩm có id = 1
 */

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const product = await ProductController.getById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi lấy chi tiết sản phẩm: ./routes/products" });
  }
});

/**
 * http://localhost:8686/products/search/name?name=abc
 * method: GET
 * tìm kiếm các sản phẩm theo tên
 */

router.get("/search/name", async function (req, res, next) {
  try {
    const { name } = req.query;
    const product = await ProductController.searchByName(name);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi tìm sản phẩm theo tên: ./routes/products" });
  }
});

/**
 * http://localhost:8686/products
 * method: POST
 * thêm mới 1 sản phẩm
 */

router.post("/",[validation.ValidateProduct], async function (req, res, next) {
  try {
    const { body } = req;
    await ProductController.add(body);
    return res.status(200).json({ message: "Thêm mới sản phẩm thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi thêm mới sản phẩm: ./routes/products" });
  }
});

/**
 * http://localhost:8686/products/1
 * method: PUT
 * cập nhật sản phẩm có id =1
 */

router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    await ProductController.update(id, body);
    return res.status(200).json({ message: "Sửa sản phẩm thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi sửa sản phẩm: ./routes/products" });
  }
});

/**
 * http://localhost:8686/products/1
 * method: DELETE
 * xóa sản phẩm có id =1
 */

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await ProductController.remove(id);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});

module.exports = router;
