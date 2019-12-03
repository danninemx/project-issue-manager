const db = require("../models");

module.exports = {

  getComments: function (req, res) {
    console.log('\n commentController getComments req : ', req);

    db.Comment.find((error, data) => {
      console.log(' returned getComments data: ', data)
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  },

  createComment: function (req, res) {
    console.log('\n commentController req.body:', req.body);
    db.Comment.create(req.body)
      .then(dbComment => {
        console.log('createComment returned :', dbComment)
        res.json(dbComment)
      })
      .catch(err => res.status(422).json(err));
  },

  // // Call this to update records for user. 
  // // You get to do this only if you are the developer in the org & prod for the issue.
  // updateIssue: function (req, res) {
  //   // console.log('\n issueController-update received this : ', req);
  //   console.log('\n controller received req of : ', req);
  //   db.Issue.findOneAndUpdate({ id: req.params.id }, req.body)
  //     .then(dbIssue => {
  //       console.log(' returned data: ', dbIssue)
  //       res.json(dbIssue)
  //     })
  //     .catch(err => res.status(422).json(err));
  // }

};
