"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
exports.item_detail = asyncHandler(async (req, res, next) => {
    //Get list of categories
    const item = await Item.findOne({ _id: req.params.id }).exec();
    res.render("item_detail", {
        title: item.name,
        item: item,
    });
});
