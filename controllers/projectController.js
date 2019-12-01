const db = require("../models");

module.exports = {


  getProj: function (req, res) {
    // Does not work
    // console.log('\n proj controller got proj full req: ', req);
    // console.log('\n proj controller got proj req.query: ', req.query);
    // console.log('\n proj controller got proj req.body: ', req.body);
    // console.log('\n proj controller got proj req.params: ', req.params);
    // db.Project.find(req.query)
    //   // db.Project.find(req)
    //   .then(proj => {
    //     console.log('getProj got back:', proj);
    //     res.json(proj);
    //   })
    //   .catch(err => res.status(422).json(err));

    // works
    console.log('\n proj controller sees getProj full req: ', req);
    console.log('\n proj controller sees getProj req.query: ', req.query);
    console.log('\n proj controller sees getProj req.body: ', req.body);
    console.log('\n proj controller sees getProj req.params: ', req.params);
    db.Project.find((error, data) => {
      console.log(' returned getProj data: ', data)
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
  },

  // https://mongoosejs.com/docs/api.html#model_Model.findById
  findById: function (req, res) {
    console.log('\n projectController findbyid w/ req: ', req);
    // db.Project.findById(req.params.id)
    // .exec(dbProj => res.json(dbProj))
    db.Project.find((error, data) => {
      console.log(' returned getProj data: ', data)
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
      .populate('org')
      .exec()
      .then(proj => {
        console.log('getProj got back:', proj);
        res.json(proj)
      })
  },

  updateProj: function (req, res) {
    console.log('\n projectController update w/ req: ', req);
    console.log('\n projectController update w/ req.params: ', req.params);
    console.log('\n projectController update w/ req.params.id: ', req.params.id);
    console.log('\n projectController update w/ req.body: ', req.body);

    // https://seabadger.io/tech/web-development/populate-fields-mongoose/
    db.Project.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true },
      function (err, result) {
        if (err) return next(err);
        if (result) {
          console.log('updateProj returned: ', result)
          res.json(result);
        } else {
          next();
        }
      });
    /* does not work
    db.Project.findOneAndUpdate(
      { id: req.params.id },  // findByIdAndUpdate uses _id instead
      req.body
    )
      .then(dbProj => {
        console.log('updateProj returned: ', dbProj);
        res.json(dbProj);
      })
      // .exec(function (dbProj) { // crashes connection
      //   console.log('updateProj returned: ', dbProj);
      //   res.json(dbProj);
      // })
      .catch(err => res.status(422).json(err));
      */

    // https://mongoosejs.com/docs/api.html#model_Model.populate
    // below is not yet fully edited
    // db.Project.populate(organization, { path: 'weapon' }, function (err, users) {
    //   users.forEach(function (user) {
    //     console.log('%s uses a %s', users.name, user.weapon.name)
    //     // Indiana Jones uses a whip
    //     // Batman uses a boomerang
    //   });
    // });

  }

  /* just in case. non func *
  updateProj: function (req, res) {
    db.Project.findByIdAndUpdate(
      // the id of the item to find
      req.params.id,

      // the change to be made. Mongoose will smartly combine your existing 
      // document with this change, which allows for partial updates too
      req.body,

      // an option that asks mongoose to return the updated version 
      // of the document instead of the pre-updated one.
      { new: true },

      // the callback function
      (err, proj) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(proj);
      }
    )
  }
*/

}
