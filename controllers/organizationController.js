const db = require("../models");

module.exports = {

  createOrg: function (req, res) {
    console.log('\n org controller req.body:', req.body);
    db.Organization.create(req.body)
      .then(dbOrg => {
        console.log('orgController createOrg returned: ', res);
        res.json(dbOrg)
      })
      .catch(err => res.status(422).json(err));
  },


  getOrgs: function (req, res) {

    // NONE OF THESE LOGS WORKS
    // console.log('\n org controller getOrgs: ', req);
    // console.log('\n org controller getOrgs req query: ', req.query);
    // console.log('\n org controller getOrgs req body: ', req.body);
    // console.log('\n org controller getOrgs req params: ', req.params);

    db.Organization.find(req.query)
      // db.Organization.find(req) // omiting query fails even tho log shows nothing
      .then(user => {
        console.log('orgController - getOrg returned:', res)
        res.json(user)
      })
      .catch(err => res.status(422).json(err));
  }
};
