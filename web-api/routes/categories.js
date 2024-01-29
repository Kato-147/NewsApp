var express = require("express");
var router = express.Router();
const CategoryController = require("../components/categories/controller");
// http://localhost:8686/categories

/**
 * http://localhost:8686/categories
 * method: GET
 * lấy danh sách danh mục
 */
router.get("/", async (req, res, next) => {
  try {
    const categories = await CategoryController.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Có lỗi bên routeCategory đại vương ơi! " });
  }
});

/**
 * http://localhost:8686/categories/1
 * method: GET
 * lấy chi tiết 1 danh mục có id =1
 */

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryController.getOneById(id);
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "lỗi bên route: lấy chi tiết 1 danh mục " });
  }
});

/**
 * http://localhost:8686/categories
 * method: POST
 * thêm mới 1 danh mục
 */

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    await CategoryController.addNew(body);
    return res.status(200).json({ message: "Thêm mới category thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi thêm mới 1 danh mục: routes/categories" });
  }
});

/**
 * http://localhost:8686/categories/1
 * method: PUT
 * sửa danh mục có id =1
 */

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await CategoryController.updateById(id, body);
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Có lỗi bên sửa danh mục: ./routes/categories" });
  }
});

/**
 * http://localhost:8686/categories/id
 * method: DELETE
 * xóa danh mục theo id
 */

router.delete('/:id', async(req,res, next)=>{
    try {
        const {id} = req.params;
        await CategoryController.deleteById(id);
        return res.status(200).json({message: 'Xóa category thành công'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Có lỗi: ./routes/categories'});
    }
})

module.exports = router;
