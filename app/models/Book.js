// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Book', {
  asin   : {type : String, required: true},
	title  : {type : String, required: true},
	author : {type : String, required: true},
	cover  : {type : String, required: true},

});
