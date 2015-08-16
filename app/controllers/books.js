(function () {

  var Book = require('./../models/Book.js');

  module.exports = {

    topBooks: function(req, res) {
      Book
      .find({})
      .sort({'votes': -1})
      .limit(100)
      .exec(function(err, books) {
        res.send(books);
      });
    },

    searchBooks: function(req, res) {
      var Search = require('./Search.js');
      Search(req.body, function(error, data) {
        if (error) {
          console.debug('Search: ' + err);
          res.status(400).send(error);
        } else {
          res.json(JSON.stringify(data));
        };
      });
    }
  }

}());

