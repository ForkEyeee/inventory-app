const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");
router.get("/", category_controller.index);

router.get("/category/:id", category_controller.category_detail);

router.get("/items/:id", item_controller.item_detail);

module.exports = router;
