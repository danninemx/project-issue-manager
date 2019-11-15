const router = require("express").Router();
const dashboardController = require("../../controllers/dashboardController");

// Matches with "/api/dashboard"
router
  // Use URL as-is
  .route("/")
  .get(dashboardController.test);
// .get(dashboardController.findAll);

module.exports = router;
