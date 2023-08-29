const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

router.get("/", category_controller.index);

router.get("/items", item_controller.item_list);

router.get("/category/:id", category_controller.category_detail);

router.get("/items/:id", item_controller.item_detail);

router.get("/items/:id/delete", item_controller.item_delete_get);

router.post("/items/:id/delete", item_controller.item_delete_post);

router.get("/category/:id/delete", category_controller.category_delete_get);

router.post("/category/:id/delete", category_controller.category_delete_post);

module.exports = router;
