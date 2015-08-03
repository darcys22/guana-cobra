(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Book = require('./Book.js'),
  Q = require('q'),
  findOrCreate = require('mongoose-findorcreate');

// define our user model
var UserSchema = new Schema({
  id : {type : String, required: true},
  email : {type : String},
  books : [{type: Schema.Types.ObjectId, ref: 'Book'}]
});


UserSchema.plugin(findOrCreate);

UserSchema.methods.createFromAsin = function (amazonId) {

  var deferred = Q.defer()
  var instance = this;

  Book.findOrCreate({asin: amazonId.bookId}, function (err, bookObject, created) {
    if (err) { console.log(err)}
    if (created) {
      var apacCredentials = require('../../config/apac.js'),
        OperationHelper = require('apac').OperationHelper;

      var opHelper = new OperationHelper({
        awsId: apacCredentials.accessKey,
        awsSecret: apacCredentials.secretKey,
        assocId: apacCredentials.assocID
      });


      opHelper.execute('ItemLookup', {
        //'SearchIndex': 'Books',
        'ItemId' : amazonId.bookId,
        'ResponseGroup': 'ItemAttributes,Images'
      }, function(err, results) {
        bookObject.title  = results.ItemLookupResponse.Items[0].Item[0].ItemAttributes[0].Title[0];
        bookObject.author = results.ItemLookupResponse.Items[0].Item[0].ItemAttributes[0].Author[0];
        bookObject.cover  = results.ItemLookupResponse.Items[0].Item[0].LargeImage[0].URL[0];

        bookObject.save(function (err, book) {
          instance.books.push(book._id);
          instance.save(function (e) {
            if (!e) {
              console.log('Success inside! and new book');
              instance.populate('books', function (err) {
                deferred.resolve(instance.books);
              });
            }
          });

        });

      });


    } else {

      instance.books.push(bookObject._id);
      instance.save(function (e) {
        if (!e) {
          console.log('Success inside! and old book');
          instance.populate('books', function (err) {
            deferred.resolve(instance.books);
          });
        }
      });

    }
  });
  return deferred.promise;
};

UserSchema.methods.delete = function (bookId) {
  var deferred = Q.defer()
  var instance = this;

  this.books.pull(bookId);
  this.save(function (err, book) {
    if (!err) {
      instance.populate('books', function (err) {
        if (!err) {
          deferred.resolve(instance.books);
        } else {
          deferred.reject(err);
        };
      });
    } else {
      deferred.reject(err);
    }
  });

  return deferred.promise;
};

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);

})();




