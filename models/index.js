module.exports = {
  Book: require("./book"), // leave in for the time being to let legacy routes work

  User: require("./user"),
  Organization: require("./organization"),
  Product: require('./product'),
  Member: require('./member'),
  Issue: require("./issue")
};
