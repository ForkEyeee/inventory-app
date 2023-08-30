"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 200 },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    price: { type: Number },
    quantity: { type: Number },
}, { collection: "items" });
ItemSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/items/${this._id}`;
});
module.exports = mongoose.model("Item", ItemSchema);
//# sourceMappingURL=item.js.map