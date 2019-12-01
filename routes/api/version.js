const router = require("express").Router();
const versionController = require("../../controllers/versionController");

// Matches with "/api/versions"
router
  // Use URL as-is
  .route("/")
  .get(versionController.getVers) // setting up
  .post(versionController.createVer) // setup 
// .get(versionController.findOneorganization)

// Matches with "/api/versions/:id"
router
  .route("/:id")
  .put(versionController.updateVer)
// .delete(versionController.remove)

// Matches with "/api/organizations/:email"
// router
//   .route("/:email")


module.exports = router;
