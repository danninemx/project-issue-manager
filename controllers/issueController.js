const db = require("../models");

module.exports = {

  getIssues: function (req, res) {
    console.log('\n issueController getIssues req : ', req);
    // db.Issue.find(req.query)
    //   .then(issues => res.json(issues))
    //   .catch(err => res.status(422).json(err));

    db.Issue.find((error, data) => {
      console.log(' returned getIssues data: ', data)
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  },

  // works
  createIssue: function (req, res) {
    console.log('\n issueController req.body:', req.body);
    db.Issue.create(req.body)
      .then(dbIssue => {
        console.log('createIssue returned :', dbIssue)
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
