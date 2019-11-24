const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router
  // Use URL as-is
  .route("/")
  .get(userController.getUsers)
  .get(userController.findOneUser)
  .post(userController.createUser)

// Matches with "/api/users/:id"
router
  .route("/:id")
  .put(userController.update)
// .delete(userController.remove)

// Matches with "/api/users/:email"
router
  .route("/:email")


module.exports = router;
