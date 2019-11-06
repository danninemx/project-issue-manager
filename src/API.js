import axios from "axios";

// const domain = 'https://www.googleapis.com/books/v1/volumes?q=';

export default {
  // Gets books from the Google API
  getBooks: function (q) {
    // return axios.get("/api/google", { params: { q: "title:" + q } });
    // let searchTerm = `https://www.googleapis.com/books/v1/volumes?q=${q}`;
    // console.log(`\n Now querying: ${searchTerm} \n`);
    // return axios.get(searchTerm);
    console.log("querying for : " + q);
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + q);

  },
  // Gets all saved books
  getSavedBooks: function () {
    return axios.get("/api/books");
  },
  // Deletes the saved book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves an book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
