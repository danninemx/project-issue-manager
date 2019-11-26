const router = require("express").Router();
const organizationController = require("../../controllers/organizationController");

// Matches with "/api/organizations"
router
  // Use URL as-is
  .route("/")
  .get(organizationController.getOrgs) // setting up
  // .get(organizationController.findOneorganization)
  .post(organizationController.createOrg) // setup 


module.exports = router;
