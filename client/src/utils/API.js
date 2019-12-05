import axios from "axios";

export default {
  // ok
  getUsers: function (q) {
    console.log(`\n getUsers is querying for : `, q);
    return axios.get("/api/users", { params: { q } });
  },

  // ok, I think?
  createUser: function (userData) {
    // console.log(`\n createUser is attempting to save : `, userData);
    return axios.post("/api/users", userData);
  },

  // params search required key and value.
  // key of email and value of address is like
  // http://localhost:3000/api/users?email=dudkny@gmail.com

  // missing explicit param turn it into "query" like
  // ... /api/users?q=dudkny@gmail.com

  // http://localhost:3000/api/users?email=dudkny@gmail.com
  findOneUser: function (email) {
    console.log(`\n API findOneUser : `, email);
    return axios.get("/api/users", { params: { email } });
    // Must wrap params as above. Below does not work.
    // console.log(`\n findOneUser is querying for : `, email);
    // return axios.get("/api/users", email);
  },

  findUserById: function (id) {
    console.log(`\n API findUserById w/ id: `, id);
    return axios.get("/api/users/" + id);
  },

  // syntax FYI
  // delete(function (req, res, next) {
  //   //Only allow deleting user without an entry
  //   entryModel.findOne({
  //     author: req.params.userId
  //   }, function (err, resp) {
  //     if (err) return next(err);
  //     if (typeof resp === 'object') {
  //       err = new Error("This user owns entries, remove the entries first");
  //       err.status = 412; //precondition failed
  //       return next(err);
  //     }
  //   })
  // }

  // Deletes the saved user with the given id
  deleteUser: function (id) {
    console.log(`\n deleteUser is attempting to delete : ${id}`);
    return axios.delete("/api/users/" + id);
  },

  // ORG

  getOrgs: function (q) {
    console.log(`\n API getOrgs : `, q);
    return axios.get("/api/orgs", { params: { q } });
  },

  // oks
  createOrganization: function (orgData) {
    console.log('API create org');
    return axios.post("/api/orgs", orgData);
  },

  // Project

  // test after creating version.
  // this is object in form of { name: this.name }
  createProject: function (projData) {
    console.log('API create project', projData);
    return axios.post("/api/projects", projData);
  },

  // works
  getProjects: function (q) {
    console.log('API get projects :', q);
    return axios.get("/api/projects", { params: { q } });
  },

  updateProject: function (id, projData) {
    console.log(`\n API updateProject w/ id: `, id);
    return axios.put("/api/projects/" + id, projData);
  },

  // Version //

  createVersion: function (data) {
    console.log('API create version', data);
    return axios.post("/api/versions", data);
  },

  updateVersion: function (id, verData) {
    console.log(`\n API updateVersion w/ id: `, id);
    return axios.put("/api/versions/" + id, verData);
  },

  getVersions: function (q) {
    console.log(`\n API getVersions : `, q);
    return axios.get("/api/versions", { params: { q } });
  },

  findOneVersion: function (id) {
    console.log(`\n API find one version : `, id);
    return axios.get("/api/versions", { params: { id } });
  },

  // Issue //

  createIssue: function (issueData) {
    console.log(`\n API create issue : `, issueData);
    return axios.post("/api/issues", issueData);
  },

  getIssues: function (q) {
    console.log(`\n API getIssues : ${q}`);
    return axios.get("/api/issues", { params: { q } });
  },

  updateIssue: function (id, data) {
    console.log(`\n API updateIssue w/ id: `, id);
    return axios.put("/api/issues/" + id, data);
  },

  // Comment //

  createComment: function (data) {
    console.log(`\n API create comment : `, data);
    return axios.post("/api/comments", data);
  },

  getComments: function (q) {
    console.log(`\n API getComments : ${q}`);
    return axios.get("/api/comments", { params: { q } });
  },

  updateComment: function (id, data) {
    console.log(`\n API updateComment w/ id: `, id);
    return axios.put("/api/comments/" + id, data);
  }
};