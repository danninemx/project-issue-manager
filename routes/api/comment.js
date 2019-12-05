const router = require("express").Router();
const commentController = require("../../controllers/commentController");

// Matches with "/api/comments"
router
  // Use URL as-is
  .route("/")
  .get(commentController.getComments)
  .post(commentController.createComment)
  .put(commentController.updateComment)

module.exports = router;
