"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
router.get("/", category_controller.index);
router.get("/:id", category_controller.category_detail);
module.exports = router;
