const router = require("express").Router();
const issueController = require("../../controllers/issueController");

// Matches with "/api/issues"
router
  // Use URL as-is
  .route("/")
  .get(issueController.getIssues)
  .post(issueController.createIssue);

module.exports = router;
