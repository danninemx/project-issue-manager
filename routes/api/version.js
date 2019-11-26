const router = require("express").Router();
const versionController = require("../../controllers/versionController");

// Matches with "/api/versions"
router
  // Use URL as-is
  .route("/")
  .get(versionController.getVers) // setting up
  // .get(versionController.findOneorganization)
  .post(versionController.createVer) // setup 

// Matches with "/api/organizations/:id"
// router
// .route("/:id")
// .put(versionController.update)
// .delete(versionController.remove)

// Matches with "/api/organizations/:email"
// router
//   .route("/:email")


module.exports = router;
