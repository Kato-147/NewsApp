var express = require("express");
var router = express.Router();
const validation = require("../components/helpers/Validation");
const TicketController = require("../components/ticket/controller");

// http://localhost:8686/tickets

/**
 * http://localhost:8686/tickets?size10&page=1
 * method: GET
 * lấy danh sách vé
 */

router.get("/", async function (req, res, next) {
  try {
    const { size, page } = req.query;
    const tickets = await TicketController.getAll(size, page);
    return res.status(200).json({ data: tickets });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi lấy danh sách vé: ./routes/tickets" });
  }
});

/**
 *
 *
 * method: GET
 * lấy chi tiết vé có id = 1
 */

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const tickets = await TicketController.getById(id);
    return res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi lấy chi tiết vé: ./routes/tickets" });
  }
});

/**
 * http://localhost:8686/tickets
 * method: POST
 * thêm mới 1 vé
 */

router.post("/add", async function (req, res, next) {
  try {
    const { body } = req;
    await TicketController.add(body);
    return res.status(200).json({ message: "Thêm mới vé thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi thêm mới vé: ./routes/tickets" });
  }
});

/**
 * http://localhost:8686/tickets/1
 * method: PUT
 * cập nhật vé có id =1
 */

router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    await TicketController.update(id, body);
    return res.status(200).json({ message: "Sửa vé thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi sửa vé: ./routes/tickets" });
  }
});

/**
 * http://localhost:8686/tickets/1
 * method: DELETE
 * xóa vé có id =1
 */

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await TicketController.remove(id);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});

module.exports = router;
