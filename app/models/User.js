(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Book = require('./Book.js'),
  findOrCreate = require('mongoose-findorcreate');

// define our user model
var UserSchema = new Schema({
  id : {type : String, required: true},
  email : {type : String},
  books : [{type: Schema.Types.ObjectId, ref: 'Book'}]
});


UserSchema.plugin(findOrCreate);

UserSchema.methods.createFromAsin = function (asin, cb) {
  var apacCredentials = require('../../config/apac.js'),
    OperationHelper = require('apac').OperationHelper;

  var opHelper = new OperationHelper({
    awsId: apacCredentials.accessKey,
    awsSecret: apacCredentials.secretKey,
    assocId: apacCredentials.assocID
  });

  var instance = this;

  opHelper.execute('ItemLookup', {
    'SearchIndex': 'Books',
    'ItemId' : asin,
    'ResponseGroup': 'ItemAttributes,Images'
  }, function(err, results) {
    var bookObject = new Book({
      'title': 'Bleh',
      'author': 'More Bleh',
      'asin': 'Numbers Bleh',
      'cover': 'URL BLEH'
    });
    bookObject.save(function (err, book) {
      instance.books.push(book._id);
      instance.save(function (e) {
        if (!e) console.log('Success inside!');
      });
    });

  });

};

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);

})();




