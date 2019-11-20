const db = require("../models");

module.exports = {
  test: function () {
    document.getElementsByTagName("body") = "testing";
  },

  // Call this to get all users' info (no use case)
  getAllUsers: function (req, res) {
    console.log('\n userController-getUserInfo received this : ', req);
    db.User.find(req.query)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  // Call this to get one user's info (signin, __id acquisition)
  findOneUser: function (req, res) {
    console.log('\n userController-findOneUser received this : ', req);
    db.User.findOne({ email: req.params.email })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
    // or per Mongoose docs,
    // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
  },

  // Call this to start tracking records for user
  createUser: function (req, res) {
    console.log('\n userController-getUserInfo received this : ', req);
    db.User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  // Call this to update records for user. 
  // You get to do this only if you are the developer in the org & prod for the issue.
  update: function (req, res) {
    console.log('\n userController-getUserInfo received this : ', req);
    db.User.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  // Call this to remove a user (un-registration)
  removeUser: function (req, res) {
    console.log('\n userController-getUserInfo received this : ', req);
    db.User.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
