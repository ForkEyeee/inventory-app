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
  res.render("item_detail", {
    title: item.name,
    item: item,
    item_url: item.url,
  });
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  //Get item to delete
  const item = await Item.findOne({ _id: req.params.id }).exec();
  res.render("item_delete", {
    title: item.name,
    item_id: item._id,
  });
  console.log(item);
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  //delete item
  await Item.deleteOne({ _id: req.params.id }).exec();
  res.redirect("/catalog/items");
});
