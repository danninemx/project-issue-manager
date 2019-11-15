const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./google");
const dashboardRoutes = require("./dashboard");

// // Book routes
// router.use("/books", bookRoutes);

// // Google Routes
// router.use("/google", googleRoutes);

// Dashboard Routes
router.use("/dashboard", dashboardRoutes);


// For anything else, render the html page
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
