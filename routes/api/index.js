const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const issueRoutes = require("./issue");

// user Routes
router.use("/users", userRoutes);

// issue Routes
router.use("/issues", issueRoutes);

// For anything else, render the html page
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
