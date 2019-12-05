const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const versionSchema = new Schema({
  // name: { type: String, required: true },
  // description: { type: String, required: false },
  name: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' }

});

const Version = mongoose.model("Version", versionSchema);

module.exports = Version;
