(function() {

  var util = require('util');
  var apacCredentials = require('../../config/apac.js');
  OperationHelper = require('apac').OperationHelper;

  var opHelper = new OperationHelper({
      awsId: apacCredentials.accessKey,
      awsSecret: apacCredentials.secretKey,
      assocId: apacCredentials.assocID 
  });


  var query = function ( queryObject ) {
    
        opHelper.execute('ItemSearch', {
            'SearchIndex': 'Books',
            'Keywords': 'harry potter',
            'ResponseGroup': 'ItemAttributes,Offers'
        }, function(error, results) {
            if (error) { console.log('Error: ' + error + "\n"); }
            console.log("Results:\n" + util.inspect(results) + "\n");
        });

        return './app/models/generated.json'
  };

  module.exports = query;

})();
