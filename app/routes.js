module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
  //
  ////         Resource        Get         post         put        Delete
  //
  ////         Top        Return top books  405         405        405
  ////         users          405     Create new user   405        405
  ////         users:id   Return user books        Updates Book List
  //                                    adds new book              Deletes
  ////         Search     Return Search
  //
  ////         blacklist  Return blacklist  add to blacklist      remove from blacklist
  ////         graylist     ""                    ""                  ""  

  app.get('/api/top', function(req, res) {
    res.sendfile('./app/models/generated.json');
  });

  app.get('/api/users/:id', function(req, res) {
    res.sendfile('./app/models/generated.json');
  });
  
  app.get('/api/search', function(req, res) {
    //deferred.resolve($filter('limitTo')(data, 5, Math.random() * data.length));
    
    var Search = require('./models/Search.js');
    res.sendfile(Search('hello'));
  });


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
