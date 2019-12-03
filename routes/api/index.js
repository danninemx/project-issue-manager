const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const organizationRoutes = require("./organization");
const projectRoutes = require("./project");
const versionRoutes = require("./version");
const issueRoutes = require("./issue");
const commentRoutes = require("./comment");

// user Routes
router.use("/users", userRoutes);

// org Routes
router.use("/orgs", organizationRoutes);

// project Routes
router.use("/projects", projectRoutes);

// version Routes
router.use("/versions", versionRoutes);

// issue Routes
router.use("/issues", issueRoutes);

// comment Routes
router.use("/comments", commentRoutes);


// For anything else, render the html page
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
