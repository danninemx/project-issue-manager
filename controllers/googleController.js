const axios = require("axios");
const db = require("../models");

module.exports = {
  // Call this to query the Google Books API and return only the entries that have not yet been saved
  findAll: function (req, res) {
    const { query: params } = req;
    console.log(`\n req was ${req} \n`);
    console.log(`\n params was ${params} \n`);
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      // Filter the the books returned from the API for all of the following: title, author, link, description, and a normal-size image
      .then(results =>
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      // Query existing books collection. For each book, compare the id to remove duplicates from the result
      .then(apiBooks =>
        db.Book.find().then(dbBooks =>
          apiBooks.filter(apiBook =>
            dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
          )
        )
      )
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  }
};
