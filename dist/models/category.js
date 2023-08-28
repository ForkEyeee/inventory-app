"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: { type: String },
    description: { type: String },
}, { collection: "categories" });
CategorySchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/genre/${this._id}`;
});
module.exports = mongoose.model("Category", CategorySchema);
