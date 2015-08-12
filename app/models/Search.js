(function() {

  var apacCredentials = require('../../config/apac.js');
  var OperationHelper = require('apac').OperationHelper;

  var opHelper = new OperationHelper({
      awsId: apacCredentials.accessKey,
      awsSecret: apacCredentials.secretKey,
      assocId: apacCredentials.assocID 
  });

  var responseBuilder = function (amazonBook) {
      var author;
      //Kindles have creator instead of Author so it would return an undefined error
      try { author = amazonBook.ItemAttributes[0].Author[0] 
      } catch(e) {
        author = amazonBook.ItemAttributes[0].Creator[0]._
      }
      return {
        //URL:      amazonBook.DetailPageURL[0], //String of Link to amazon
        Title:    amazonBook.ItemAttributes[0].Title[0], //String of Title
        Author:   author, //String of Author
        ID:   amazonBook.ASIN[0], //AMAZON STANDARD IDENTIFICATION NUMBER
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
    oldQuery["ResponseGroup"] = 'ItemAttributes';
    oldQuery["SearchIndex"] = 'Books';
    return oldQuery;
  };



  var query = function ( query, callback ) {
    
        opHelper.execute('ItemSearch', queryBuilder(query),
        function(error, results) {
            if (error) {
              callback(error);
            } else if (results.ItemSearchResponse.Error) { 
              callback('Error: ' + results.ItemSearchResponse.Error + "\n");
            } else if (results.ItemSearchResponse.Items[0].TotalResults[0] == '0') {
              callback('No Results');
            } else {
              try {
                callback(null, jsBuilder(arrayLocator(results)));
              } catch(e) {
                callback(e);
              }
            }
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
