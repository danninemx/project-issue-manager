const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/dashboard"
router
  // Use URL as-is
  .route("/")
  .get(userController.test);
// .get(userController.findAll);

module.exports = router;
