(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// define our Book model
var BookSchema = new Schema({
  	asin   : {type : String, required: true},
	title  : {type : String, required: true},
	author : {type : String, required: true},
	cover  : {type : String, required: true},

});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Book', BookSchema);

})();





