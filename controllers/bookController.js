const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    console.log(`bookController-findAll received this : ${req}`);
    db.Book.find(req.query)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    console.log(`bookController-findById received this : ${req}`);
    db.Book.findById(req.params.id)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(`bookController-create received this : ${req}`);
    db.Book.create(req.body)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log(`bookController-update received this : ${req}`);
    db.Book.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    console.log(`bookController-remove received this : ${req}`);
    db.Book.findById(req.params.id)
      .then(dbBook => dbBook.remove())
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  }
};
