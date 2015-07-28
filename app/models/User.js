(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// define our user model
var UserSchema = new Schema({
  id : {type : String, required: true},
  email : {type : String},
  books : [Book.schema]
});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);

})();




