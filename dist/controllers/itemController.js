"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
exports.item_list = asyncHandler(async (req, res, next) => {
    // Get list of items
    const items = await Item.find({}).exec();
    res.render("item_list", {
        title: "Item List",
        item_list: items,
    });
});
exports.item_detail = asyncHandler(async (req, res, next) => {
    //Get list of categories
    const item = await Item.findOne({ _id: req.params.id }).exec();
    const category = await Category.findOne({ _id: item.category });
    res.render("item_detail", {
        title: item.name,
        item: item,
        item_url: item.url,
        category_name: category.name,
    });
});
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    //Get item to delete
    const item = await Item.findOne({ _id: req.params.id }).exec();
    res.render("item_delete", {
        title: item.name,
        item_id: item._id,
    });
    // console.log(item);
});
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    //delete item
    await Item.deleteOne({ _id: req.params.id }).exec();
    res.redirect("/catalog/items");
});
exports.item_create_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}).exec();
    // categories.forEach(category => {
    //   // console.log(`Before ${category._id}`);
    //   category._id = category._id.toString();
    //   // console.log(`After ${category._id}`);
    // });
    // console.log(categories[0]._id);
    res.render("item_form", {
        title: "Create Item",
        category_list: categories,
    });
});
exports.item_create_post = asyncHandler(async (req, res, next) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.desc,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
    });
    // res.redirect("");
    // console.log(newCategory);
    console.log(newItem);
    await newItem.save();
    res.redirect(newItem.url);
});
exports.item_update_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findOne({ _id: req.params.id }).exec();
    const category = await Category.find({}).exec();
    // const newCategory: any = new Category({
    //   name: req.body.name,
    //   description: req.body.desc,
    // });
    console.log(item.category);
    res.render("item_form", {
        title: "Update Item",
        item: item,
        category_list: category,
    });
});
exports.item_update_post = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    await Item.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.desc,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
    });
    res.redirect("/catalog/items/" + req.params.id);
});
//# sourceMappingURL=itemController.js.map