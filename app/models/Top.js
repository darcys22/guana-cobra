(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Book = require('./Book.js');


// define our Top model
var TopSchema = new Schema({
  rank : {type : Number, required: true},
  books : [Book.schema]

});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Top', TopSchema);

})();




