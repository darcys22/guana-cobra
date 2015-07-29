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
  //
  //POST  /magazines/:magazine_id/ads   ads#create  create a new ad belonging to a specific magazine

  app.get('/api/top', function(req, res) {
    res.sendfile('./app/models/generated.json');
  });

  app.get('/api/users/:id/books', function(req, res) {
    res.sendfile('./app/models/generated.json');
  });

  app.post('/api/users/:id/books', function(req, res) {

    var User = require('./models/User.js');
    var currentUser = new User({id: '1'});
    User.findOrCreate({id: 1}, function(err, currentUser, created) {
      currentUser.createFromAsin(req.body, function(e,c) {
        res.send(c);
      });
    });
    //console.log(req.body);
    //res.send({redirect: '/mybooks'});
  });
  
  app.post('/api/search', function(req, res) {
    var Search = require('./models/Search.js');
    //TODO Make this a promise instead of a callback
    Search(req.body, function(error, data) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.json(JSON.stringify(data));
      };
    });
  });


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
