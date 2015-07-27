(function() {

  //var util = require('util');
  var apacCredentials = require('../../config/apac.js');
  OperationHelper = require('apac').OperationHelper;

  var opHelper = new OperationHelper({
      awsId: apacCredentials.accessKey,
      awsSecret: apacCredentials.secretKey,
      assocId: apacCredentials.assocID 
  });

  var responseBuilder = function (amazonBook) {
      return {
        //URL:      amazonBook.DetailPageURL[0], //String of Link to amazon
        Title:    amazonBook.ItemAttributes[0].Title[0], //String of Title
        Author:   amazonBook.ItemAttributes[0].Author[0], //String of Author
        //Img:      amazonBook.LargeImage[0].URL[0] //ImageURL
      }
  };

  var jsBuilder = function (resultsArray) {

    var returnNumber = 5;
    var unformattedArray = resultsArray.splice(0, returnNumber);
    var index;
    var ret = [];

    for (index = 0; index < resultsArray.length; ++index) {
      ret.push(responseBuilder(unformattedArray[index]));
    }

    return ret;
  };

  var arrayLocator = function (rawResults) {
    return rawResults.ItemSearchResponse.Items[0].Item;
  };

  var queryBuilder = function (oldQuery) {
    oldQuery["Keywords"] = oldQuery["query"];
    delete oldQuery["query"];
    oldQuery["ResponseGroup"] = 'ItemAttributes';
    oldQuery["BrowseNode"] = '53';
    oldQuery["SearchIndex"] = 'Books';
    console.log(oldQuery);
    return oldQuery;
  };



  var query = function ( queryObject , callback ) {
    
        opHelper.execute('ItemSearch', queryBuilder(queryObject),
        function(error, results) {
            if (error) console.log(error);
            if (results.ItemSearchResponse.Error) { console.log('Error: ' + results.ItemSearchResponse.Error + "\n"); }
            callback(jsBuilder(arrayLocator(results)));
        });

  };

  module.exports = query;

})();

//results.ItemSearchResponse.Items[0].Item[0] ---First Result
//
//results.ItemSearchResponse.Items[0].Item[0].DetailPageURL[0] -- String of Link to amazon
//results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].Title[0] -- String of Title
//results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].Author[0] -- String of Author
//results.ItemSearchResponse.Items[0].Item[0].LargeImage[0].URL[0] -- ImageURL
//
//
//results.ItemSearchResponse.Error - Error
