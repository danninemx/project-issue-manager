const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const issueRoutes = require("./issue");
const organizationRoutes = require("./organization");
const projectRoutes = require("./project");
const versionRoutes = require("./version");

// user Routes
router.use("/users", userRoutes);

// issue Routes
router.use("/issues", issueRoutes);

// org Routes
router.use("/orgs", organizationRoutes);

// project Routes
router.use("/projects", projectRoutes);

// version Routes
router.use("/versions", versionRoutes);

// For anything else, render the html page
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
