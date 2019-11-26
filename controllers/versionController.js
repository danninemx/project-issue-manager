const db = require("../models");

module.exports = {

  createVer: function (req, res) {
    console.log('\n ver controller req.body:', req.body);
    db.Version.create(req.body)
      .then(dbVer => res.json(dbVer))
      .catch(err => res.status(422).json(err));
  },


  getVers: function (req, res) {
    console.log('\n ver controller getvers: ', req.body);
    db.Version.find(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  // Call this to get one user's info (signin, __id acquisition)
  findOneVersion: function (req, res) {
    console.log('Controller: find one version')
    db.Version.findOne({ organization: req.params.organization })
      .then(dbVer => {
        console.log('find one version got : ', dbVer)
        res.json(dbVer)
      })
      .catch(err => res.status(422).json(err));
    // or per Mongoose docs,
    // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
  },

  /*
  // Call this to update records for user. 
  // You get to do this only if you are the developer in the org & prod for the issue.
  update: function (req, res) {
    console.log('\n userController-update received this : ', req);
    db.User.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  // Call this to remove a user (un-registration)
  removeUser: function (req, res) {
    console.log('\n userController-removeUser received this : ', req);
    db.User.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
  */
};
