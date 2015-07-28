(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Book = require('./Book.js');

// define our user model
var UserSchema = new Schema({
  id : {type : String, required: true},
  email : {type : String},
  books : [Book.schema]
});

UserSchema.methods.createFromAsin = function (asin, cb) {
  var bookObject = {
    'title': 'Bleh',
    'author': 'More Bleh',
    'asin': 'Numbers Bleh',
    'cover': 'URL BLEH'
  };
  var apacCredentials = require('../../config/apac.js'),
    OperationHelper = require('apac').OperationHelper;

  var opHelper = new OperationHelper({
    awsId: apacCredentials.accessKey,
    awsSecret: apacCredentials.secretKey,
    assocId: apacCredentials.assocID
  });

  opHelper.execute('ItemLookup', {
    'SearchIndex': 'Books',
    'ItemId' : asin,
    'ResponseGroup': 'ItemAttributes,Images'
  }, function(err, results) {
    console.log(results);
  });

  return this.books.push(bookObject);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);

})();




