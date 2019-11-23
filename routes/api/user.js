const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router
  // Use URL as-is
  .route("/")
  // .get(userController.test)
  .get(userController.getUsers)
  .post(userController.createUser)

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findOneUser)
  .put(userController.update)
// .delete(userController.remove)

module.exports = router;
