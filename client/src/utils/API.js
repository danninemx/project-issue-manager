import axios from "axios";

export default {
  // Gets books from the Google API
  getBooks: function (q) {
    console.log(`\n getBooks is querying for : ${q}`);
    return axios.get("/api/google", { params: { q } });
  },
  // Gets all saved books
  getSavedBooks: function () {
    console.log(`\n getSavedBooks is getting all saved books.`);
    return axios.get("/api/books");
  },
  // Deletes the saved book with the given id
  deleteBook: function (id) {
    console.log(`\n deleteBook is attempting to delete : ${id}`);
    return axios.delete("/api/books/" + id);
  },
  // Saves an book to the database
  saveBook: function (bookData) {
    console.log(`\n saveBook is attempting to save : ${bookData}`);
    return axios.post("/api/books", bookData);
  }
};
