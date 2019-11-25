const router = require("express").Router();
const organizationController = require("../../controllers/organizationController");

// Matches with "/api/organizations"
router
  // Use URL as-is
  .route("/")
  .get(organizationController.getOrgs) // setting up
  // .get(organizationController.findOneorganization)
  .post(organizationController.createOrg) // setup 

// Matches with "/api/organizations/:id"
router
  .route("/:id")
  // .put(organizationController.update)
// .delete(organizationController.remove)

// Matches with "/api/organizations/:email"
router
  .route("/:email")


module.exports = router;
