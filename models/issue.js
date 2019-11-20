const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  _id: Schema.Types.ObjectId,

  timing: { type: String, required: true, unique: true }, // When was issue identified

  // Reporter input. Public view
  subject: { type: String, required: true },
  description: { type: String, required: true },

  // Public input & view
  organization: { type: String, required: false },
  product: { type: [String], required: false },
  resolved: { type: Boolean, required: true }, // yes/no. Default is no
  actionDescriptions: { type: [String], required: true }, // What is being or has been done. Push new items to array
  // Also provides "Final Resolution" by checking if status is Res/Closed and getting item[actionDescriptions/length]


  url: { type: String, required: false }, // Attachments can be stored elsewhere and referenced by this
  // for future scope, another property to track which part of project is impacted

  // Developer input & view
  ownerEmail: { type: String, required: false, }, // organization has default email, as does every adccount
  priority: { type: String, required: false }, // default is "medium". Can be changed to low or high
  targetResolutionDate: { type: Date, required: false },
  potentialImpact: { type: String, required: false }, // serves as reasoning for priority
  comment: { type: [String], required: false }, // syntax ref for multi-value array
  // stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]

  // Required collections for 
  associatedIssues: { type: [Schema.Types.ObjectId], required: false },
  description: { type: String, required: true },

  // For future scope
  image: { type: String, required: false }
});

// const Book = mongoose.model("Book", bookSchema);
const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
