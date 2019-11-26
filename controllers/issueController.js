const db = require("../models");

module.exports = {
  // Call this to get all issue' info (no use case)
  getIssues: function (req, res) {
    console.log('\n issueController-getIssues received this : ', req);
    db.Issue.find(req.query)
      .then(issues => res.json(issues))
      .catch(err => res.status(422).json(err));
  },

  // Call this to create issue
  createIssue: function (req, res) {
    console.log('req.body is ', req.body)
    db.Issue.create(req.body)
      .then(dbIssue => {
        console.log('returned data is', dbIssue)
        res.json(dbIssue)
      })
      .catch(err => res.status(422).json(err));
  },

  // Call this to update records for user. 
  // You get to do this only if you are the developer in the org & prod for the issue.
  updateIssue: function (req, res) {
    // console.log('\n issueController-update received this : ', req);
    console.log('\n controller received req of : ', req);
    db.Issue.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbIssue => {
        console.log(' returned data: ', dbIssue)
        res.json(dbIssue)
      })
      .catch(err => res.status(422).json(err));
  }

};
