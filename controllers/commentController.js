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

  updateComment: function (req, res) {
    console.log('\n controller received req of : ', req);
    db.Comment.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true },
      function (err, result) {
        if (err) return next(err);
        if (result) {
          console.log('updateComment returned: ', result)
          res.json(result);
        } else {
          next();
        }
      });

    //   db.Comment.findOneAndUpdate({ id: req.params.id }, req.body)
    //     .then(dbComment => {
    //       console.log('Result from updateComment: ', dbComment)
    //       res.json(dbComment)
    //     })
    //     .catch(err => res.status(422).json(err));
    // }

  }
}