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
  findOneUser: function (email) {
    console.log(`\n findOneUser is querying for : ${email}`);
    return axios.get("/api/users/", email);
  },

  // Deletes the saved user with the given id
  deleteUser: function (id) {
    console.log(`\n deleteUser is attempting to delete : ${id}`);
    return axios.delete("/api/users/" + id);
  },

  getIssues: function (q) {
    console.log(`\n getIssues is querying for : ${q}`);
    return axios.get("/api/issues", { params: { q } });
  },

  // Creates issue
  createIssue: function (issueData) {
    console.log(`\n createIssue is attempting to create : `, issueData);
    return axios.post("/api/issues", issueData);
  },

  updateIssue: function (id) {
    // console.log(`\n createIssue is attempting to update : `, id);
    console.log(`\n API: updating issue`);
    return axios.put("/api/issues/" + id);
  }
};
