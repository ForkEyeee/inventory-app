import { Request, Response, NextFunction } from "express";
const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({}).exec();
    res.render("index", {
      title: "Inventory Application",
      category_list: categories,
    });
  }
);

exports.category_detail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    const items = await Item.find({ category: req.params.id }).exec();
    res.render("category_detail", {
      title: "Categories",
      category_detail: category.name,
      category_description: category.description,
      category_id: category._id,
      category_url: category.url,
      item_list: items,
    });
  }
);

exports.category_delete_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Category.deleteOne({ _id: req.params.id }).exec();
    res.redirect("/catalog");
  }
);

exports.category_delete_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    res.render("category_delete", {
      title: category.name,
    });
  }
);

exports.category_create_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.render("category_form", {
      title: "Create Category",
    });
  }
);

exports.category_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 10 }).escape(),
  body("desc", "Description must not be empty")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const category = await Category.findOne({ _id: req.params.id }).exec();
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      const newCategory = new Category({
        name: req.body.name,
        description: req.body.desc,
      });
      await Category.findOneAndUpdate(
        { _id: req.params.id },
        { name: newCategory.name, description: newCategory.description }
      );
      res.redirect("/catalog");
    }
  }),
];

exports.category_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 10 }).escape(),
  body("desc", "Description must not be empty")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.desc,
    });
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      const newCategory = new Category({
        name: req.body.name,
        description: req.body.desc,
      });
      await newCategory.save();
      res.redirect(newCategory.url);
    }
  }),
];

exports.category_update_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    res.render("category_form", {
      title: "Update Category",
      category: category,
    });
  }
);
