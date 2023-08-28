"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
exports.index = asyncHandler(async (req, res, next) => {
    // Get details of items and categories count (in parallel)
    // const [numCategories, numItems] = await Promise.all([
    //   Item.countDocuments({}).exec(),
    //   Category.countDocuments({}).exec(),
    // ]);
    // res.render("index", {
    //   title: "Inventory Home",
    //   category_count: numCategories,
    //   item_count: numItems,
    // });
    const categories = await Category.find({}).exec();
    res.render("index", {
        title: "Inventory Application",
        category_list: categories,
    });
});
exports.categories_list = asyncHandler(async (req, res, next) => {
    //Get list of categories
    const categories = await Category.find({}).exec();
    res.render("categories_list", {
        title: "Categories",
        category_list: categories,
    });
});
