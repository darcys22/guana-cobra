(function () {

  module.exports = {

    topBooks: function(req, res) {
      res.sendfile('./app/models/generated.json');
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

