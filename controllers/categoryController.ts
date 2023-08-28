const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items and categories count (in parallel)
  const [numCategories, numItems] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Inventory Home",
    category_count: numCategories,
    item_count: numItems,
  });
});
