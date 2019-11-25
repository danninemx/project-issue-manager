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
  // ,

  // Call this to get one user's info (signin, __id acquisition)
  // findOneIssue: function (req, res) {
  //   // console.log('\n findOneUser received this : ', req);
  //   console.log('controller - find one issue');
  //   // What to use as condition?
  //   db.Issue.findOne({ email: req.params.email })
  //     .then(issue => res.json(issue))
  //     .catch(err => res.status(422).json(err));
  //   // or per Mongoose docs,
  // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
  // }
  // ,


  // // Call this to remove a user (un-registration)
  // removeUser: function (req, res) {
  //   console.log('\n issueController-getUserInfo received this : ', req);
  //   db.Issue.findById(req.params.id)
  //     .then(dbIssue => dbIssue.remove())
  //     .then(dbIssue => res.json(dbIssue))
  //     .catch(err => res.status(422).json(err));
  // }
};
