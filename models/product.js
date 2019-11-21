// import Issue from './issue';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  // At least product name is needed
  name: { type: String, required: true, unique: true },
  version: { type: String, required: false, unique: true },
  description: { type: String, required: false },
  issue: [{ type: Schema.Types.ObjectId, ref: 'Issue' }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
