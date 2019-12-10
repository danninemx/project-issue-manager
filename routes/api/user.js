const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router
  // Use URL as-is
  .route("/")
  .get(userController.getUsers) // findOneUser seems to trigger this anyway
  .get(userController.findOneUser) // probbly not needed
  .post(userController.createUser)

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findOneById)
  .put(userController.updateUser)
// .delete(userController.remove)

// Matches with "/api/users/:email"
// router
//   .route("/:email")


module.exports = router;
