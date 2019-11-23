import axios from "axios";

export default {
  // axios test
  // userTest: function (userData) {
  //   console.log(`\n testing axios call : `, userData);
  //   return axios.get("/api/users", userData);
  // },

  // Find all users meeting criteria
  getUsers: function (q) {
    console.log(`\n getUsers is querying for : ${q}`);
    return axios.get("/api/users", { params: { q } });
  },

  // Saves a user to the database
  createUser: function (userData) {
    console.log(`\n createUser is attempting to save : `, userData);
    return axios.post("/api/users", userData);
  },

  // Find one user meeting criteria.
  // Can getUsers perform the same with right criteria? Also unsure of the composition
  findOneUser: function (q) {
    console.log(`\n findOneUser is querying for : ${q}`);
    return axios.post("/api/users/:id", q);
    // return axios.post("/api/users/:id", q);
  },

  // Deletes the saved user with the given id
  deleteUser: function (id) {
    console.log(`\n deleteUser is attempting to delete : ${id}`);
    return axios.delete("/api/users/" + id);
  },

  getIssues: function (q) {
    console.log(`\n getIssues is querying for : ${q}`);
    return axios.get("/api/issues", { params: { q } });
  }

};
