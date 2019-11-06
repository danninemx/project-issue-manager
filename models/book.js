const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema named bookSchema
const bookSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  authors: { type: [String], required: true },
  // authors: { type: String, required: true }, // maybe String does not need to be in [] here
  link: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  googleId: { type: String, required: true, unique: true }
});

// Create a model named Book
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
