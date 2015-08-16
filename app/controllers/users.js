(function () {

  var User = require('./../models/User.js');

  module.exports = {

    getBooks: function(req, res) {
      User
      .findOne({id: req.params.id})
      .populate('books')
      .exec(function (err, currentUser) {
        if (err) {
          console.debug('Within FindOneUser: ' + err);
          res.status(500).send(err);
        } else if (currentUser == null) {
          console.log('currentUser = null');
          res.send([]);
        } else {
          res.send(currentUser.books);
        };
      });
    },

    addEmail: function(req, res) {
      console.log(req.body);
      res.send(req.body);
    },

    recoverCookie: function(req, res) {
      console.log(req.body);
      res.send("1753519376684165");
    },

    addBook: function(req, res) {
      User.findOrCreate({id: req.params.id}, function(err, currentUser, created) {
        if (err) {
          console.debug('FindorCreate: ' + err);
          res.status(500).send(err);
        }
        var promis = currentUser.createFromAsin(req.body); 
        promis.then(function (bklst) {
          res.send(bklst);
        });
      });
    },

    deleteBook: function(req, res) {
      User.findOne({id: req.params.id}, function(err, currentUser) {
        if (err) {
          console.debug('DeleteFindUser: ' + err);
          res.status(500).send(err);
        }
        var promis = currentUser.delete(req.params.bookid);
        promis.then(function (bklst) {
          res.send(bklst);
        });
      });
    }
  };
 
}());

