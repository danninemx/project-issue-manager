module.exports = {
  Book: require("./book"), // leave in for the time being to let legacy routes work

  User: require("./user"),
  Organization: require("./organization"),
  Project: require('./project'),
  Version: require('./version'),
  Member: require('./member'),
  Issue: require("./issue")
};
