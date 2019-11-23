// import Issue from './issue';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const versionSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: false },
  issue: [{ type: [Schema.Types.ObjectId], ref: 'Issue' }]
});

const Version = mongoose.model("Version", versionSchema);

module.exports = Version;
