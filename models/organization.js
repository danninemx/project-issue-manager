// import Member from './member';
// import Product from './product';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  url: { type: String, required: false },

  // Defined in this file
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  member: [{ type: Schema.Types.ObjectId, ref: 'Member' }]
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
