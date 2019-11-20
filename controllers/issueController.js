const db = require("../models");

module.exports = {
  test: function () {
    document.getElementsByTagName("body") = "testing";
  },

  // Call this to get all issue' info (no use case)
  getAllIssue: function (req, res) {
    console.log('\n issueController-getIssueInfo received this : ', req);
    db.Issue.find(req.query)
      .then(issues => res.json(issues))
      .catch(err => res.status(422).json(err));
  },

  // Call this to get one user's info (signin, __id acquisition)
  findOneIssue: function (req, res) {
    console.log('\n issueController-findOneUser received this : ', req);

    // What to use as condition?
    db.Issue.findOne({ email: req.params.email })

      .then(issue => res.json(issue))
      .catch(err => res.status(422).json(err));
    // or per Mongoose docs,
    // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
  },

  // Call this to start tracking records for user
  createUser: function (req, res) {
    console.log('\n issueController-getUserInfo received this : ', req);
    db.Issue.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  // Call this to update records for user. 
  // You get to do this only if you are the developer in the org & prod for the issue.
  update: function (req, res) {
    console.log('\n issueController-getUserInfo received this : ', req);
    db.Issue.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  // Call this to remove a user (un-registration)
  removeUser: function (req, res) {
    console.log('\n issueController-getUserInfo received this : ', req);
    db.Issue.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
