module.exports = function(app) {

  var users = require('./controllers/users.js'),
      books = require('./controllers/books.js'),
      path  = require('path');

  // Routes =================================================================

  app.get('/api/top', books.topBooks);

  app.route('/api/users/:id/books')
    .get(users.getBooks)
    .post(users.addBook);

  app.delete('/api/users/:id/books/:bookid', users.deleteBook);

  app.post('/api/users/:id/email/', users.addEmail);

  app.post('/api/recover/', users.recoverCookie);
  
  app.post('/api/search', books.searchBooks);

  app.get('/api/story', function(req, res) {
    res.sendFile(path.join(__dirname, 'story.txt'));
  });


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		//res.sendFile('./public/index.html');
    //res.sendFile(path.join(__dirname, 'story.txt'));
		res.sendfile('./www/index.html');
	});

};
