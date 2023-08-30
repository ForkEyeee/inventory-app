const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  // console.log(categories[0].url);
  // console.log(categories[0]);
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
    category_id: category._id,
    category_url: category.url,
    item_list: items,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  //Delete category
  // console.log("TESTING");

  await Category.deleteOne({ _id: req.params.id }).exec();
  res.redirect("/catalog");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  //Get category to delete

  const category = await Category.findOne({ _id: req.params.id }).exec();
  res.render("category_delete", {
    title: category.name,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  //Get category to delete

  res.render("category_form", {
    title: "Create Category",
  });
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  const newCategory: any = new Category({
    name: req.body.name,
    description: req.body.desc,
  });
  // res.redirect("");
  // console.log(newCategory);
  console.log(req.body);

  await newCategory.save();
  res.redirect(newCategory.url);
});
