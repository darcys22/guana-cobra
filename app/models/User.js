// grab the mongoose module
var mongoose = require('mongoose');

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
  id : {type : String, required: true},
  email : {type : String, required: true},
  books : [Book.schema]
});
