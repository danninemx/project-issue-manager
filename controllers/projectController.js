const db = require("../models");

module.exports = {


  getProj: function (req, res) {
    console.log('\n proj controller got proj full req: ', req);
    console.log('\n proj controller got proj req.query: ', req.query);
    console.log('\n proj controller got proj req.body: ', req.body);
    console.log('\n proj controller got proj req.params: ', req.params);
    // db.Project.find(req.query)
    // db.Project.find(req)
    //   .then(proj => {
    //     console.log('getProj got back:', proj);
    //     res.json(proj);
    //   })
    //   .catch(err => res.status(422).json(err));

    // works
    db.Project.find((error, data) => {
      console.log(' new getProj data: ', data)
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  },

  createProj: function (req, res) {
    console.log('\n proj controller req.body:', req.body);
    db.Project.create(req.body)
      .then(dbProj => res.json(dbProj))
      .catch(err => res.status(422).json(err));
  }
}
  // ,

  // // Call this to get one user's info (signin, __id acquisition)
  // findOneVersion: function (req, res) {
  //   console.log('Controller: find one project')
  //   db.Project.findOne({ project: req.params.project })
  //     .then(proj => {
  //       console.log('find one proj got : ', proj)
  //       res.json(proj)
  //     })
  //     .catch(err => res.status(422).json(err));
  //   // or per Mongoose docs,
  //   // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
  // },

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
// };
