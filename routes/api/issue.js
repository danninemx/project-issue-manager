const router = require("express").Router();
const issueController = require("../../controllers/issueController");

// Matches with "/api/issues"
router
  // Use URL as-is
  .route("/")
  .get(issueController.getIssues)
  .post(issueController.createIssue)

router
  // :id
  .route("/:id")
  .put(issueController.updateIssue)


module.exports = router;
