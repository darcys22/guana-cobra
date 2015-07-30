(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  findOrCreate = require('mongoose-findorcreate');

// define our Book model
var BookSchema = new Schema({
  asin   : {type : String, required: true},
	title  : {type : String},
	author : {type : String},
	cover  : {type : String},
	votes  : {type : Number, default: 0},
  rank   : {type : Number, default: 0},
	blacklist  : {type : Boolean, default: false},
	graylist   : {type : Boolean, default: false},

});

BookSchema.plugin(findOrCreate);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Book', BookSchema);

})();





