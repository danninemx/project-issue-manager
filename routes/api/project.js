const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// Matches with "/api/projects"
router
  // Use URL as-is
  .route("/")
  .get(projectController.getProj) // setting up
  .post(projectController.createProj) // setup 
// .get(projectController.findOneorganization)

router
  .route("/:id")  // Matches with "/api/projects/:id"
  .get(projectController.findById)
  .put(projectController.updateProj)
module.exports = router;
