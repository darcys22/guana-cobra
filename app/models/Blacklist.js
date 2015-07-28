(function() {

// grab the mongoose module
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// define our Blacklist model
var BlacklistSchema = new Schema({
  asin : {type: String, required: true}
});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Blacklist', BlacklistSchema);

})();




