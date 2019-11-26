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
    console.log(`\n API says findOneUser : `, email);
    return axios.get("/api/users", { params: { email } });
    // Must wrap params as above. Below does not work.
    // console.log(`\n findOneUser is querying for : `, email);
    // return axios.get("/api/users", email);
    // 
  },

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

  getIssues: function (q) {
    console.log(`\n getIssues is querying for : ${q}`);
    return axios.get("/api/issues", { params: { q } });
  },

  // maybe? Can't tell until I have org, etc to assign it to.
  createIssue: function (issueData) {
    console.log(`\n createIssue is attempting to create : `, issueData);
    return axios.post("/api/issues", issueData);
  },

  updateIssue: function (id) {
    // console.log(`\n createIssue is attempting to update : `, id);
    console.log(`\n API: updating issue`);
    return axios.put("/api/issues/" + id);
  },

  // Project

  // test after creating version.
  // this is object in form of { name: this.name }
  createProject: function (projData) {
    console.log('API create project', projData);
    return axios.post("/api/projects", projData);
  },

  // test 
  getProjects: function (q) {
    console.log('API get projects :', q);
    return axios.get("/api/projects", { params: { q } });
    // return axios.get('/api/projects', q)
  },

  // getUsers: function (q) {
  //   console.log(`\n getUsers is querying for : `, q);
  //   return axios.get("/api/users", { params: { q } });
  // },
  // Version

  createVersion: function (orgData) {
    console.log('API create version');
    return axios.post("/api/versions", orgData);
  },

  getVersions: function (q) {
    console.log(`\n getVersions is querying for : `, q);
    return axios.get("/api/versions", { params: { q } });
  },

  findOneVersion: function (id) {
    console.log(`\n API find one version : `, id);
    return axios.get("/api/versions", { params: { id } });
  }
};
