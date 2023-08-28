const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 200 },
    cateogory: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: mongoose.Decimal128, required: true },
    quanitity: { type: Number, required: true },
  },
  { collection: "items" }
);

ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/genre/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
