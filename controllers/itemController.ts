import { Request, Response, NextFunction } from "express";
const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const items = await Item.find({}).exec();
    res.render("item_list", {
      title: "Item List",
      item_list: items,
    });
  }
);

exports.item_detail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const item = await Item.findOne({ _id: req.params.id }).exec();
    const category = await Category.findOne({ _id: item.category });
    res.render("item_detail", {
      title: item.name,
      item: item,
      item_url: item.url,
      category_name: category.name,
    });
  }
);

exports.item_delete_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const item = await Item.findOne({ _id: req.params.id }).exec();
    res.render("item_delete", {
      title: item.name,
      item_id: item._id,
    });
  }
);

exports.item_delete_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Item.deleteOne({ _id: req.params.id }).exec();
    res.redirect("/catalog/items");
  }
);

exports.item_create_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({}).exec();
    res.render("item_form", {
      title: "Create Item",
      category_list: categories,
    });
  }
);

exports.item_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("desc", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity", "Quantity must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({}).exec();
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    if (!errors.isEmpty()) {
      res.render("item_form", {
        title: "Create Item",
        item: item,
        category_list: categories,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_update_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const item = await Item.findOne({ _id: req.params.id }).exec();
    const category = await Category.find({}).exec();
    res.render("item_form", {
      title: "Update Item",
      item: item,
      category_list: category,
    });
  }
);

exports.item_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("desc", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity", "Quantity must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const item = await Item.findOne({ _id: req.params.id }).exec();
      const categories = await Category.find({}).exec();
      res.render("item_form", {
        title: "Update Item",
        item: item,
        category_list: categories,
        errors: errors.array(),
      });
    } else {
      await Item.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          description: req.body.desc,
          category: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
        }
      );
      res.redirect("/catalog/items");
    }
  }),
];
