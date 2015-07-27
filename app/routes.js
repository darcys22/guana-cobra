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
  
  app.post('/api/search', function(req, res) {
    
    var Search = require('./models/Search.js');
    //TODO Make this a promise instead of a callback
    Search(req.body, function(data) {
      res.json(JSON.stringify(data));
    });
  });


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
