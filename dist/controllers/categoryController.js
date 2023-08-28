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
    console.log(categories[0].url);
    console.log(categories[0]);
    res.render("index", {
        title: "Inventory Application",
        category_list: categories,
    });
});
exports.category_detail = asyncHandler(async (req, res, next) => {
    //Get list of categories
    const category = await Category.findOne({ _id: req.params.id }).exec();
    const items = await Item.find({ category: req.params.id }).exec();
    res.render("category_detail", {
        title: "Categories",
        category_detail: category.name,
        item_list: items,
    });
    console.log(items);
});
