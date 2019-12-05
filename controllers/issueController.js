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

  updateIssue: function (req, res) {
    console.log('\n issueController update w/ req: ', req);
    console.log('\n issueController update w/ req.params: ', req.params);
    console.log('\n issueController update w/ req.params.id: ', req.params.id);
    console.log('\n issueController update w/ req.body: ', req.body);

    db.Issue.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true },
      function (err, result) {
        if (err) return next(err);
        if (result) {
          console.log('updateIssue returned: ', result)
          res.json(result);
        } else {
          next();
        }
      });

    // db.Issue.findOneAndUpdate({ id: req.params.id }, req.body)
    //   .then(dbIssue => {
    //     console.log(' returned data: ', dbIssue)
    //     res.json(dbIssue)
    //   })
    //   .catch(err => res.status(422).json(err));
  }

};
