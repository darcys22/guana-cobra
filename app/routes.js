module.exports = function(app) {

  var users = require('./controllers/users.js'),
      books = require('./controllers/books.js');

  // Routes =================================================================

  app.get('/api/top', books.topBooks);

  app.get('/api/users/:id/books', users.getBooks);

  app.post('/api/users/:userId/email/', users.addEmail);

  app.post('/api/recover/', users.recoverCookie);

  app.post('/api/users/:id/books', users.addBook);

  app.delete('/api/users/:id/books/:bookid', users.deleteBook);
  
  app.post('/api/search', books.searchBooks);


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendFile('./public/index.html');
	});

};
