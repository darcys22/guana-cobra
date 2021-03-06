// modules =================================================
var express        = require('express');
var http           = require('http');
var app            = express();
var mongoose       = require('mongoose');
var topcalc        = require('bookcalculator');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var favicon        = require('serve-favicon');
//TODO remove cookie-parser?
// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port

var User = require('./app/models/User');
var Book = require('./app/models/Book');
topcalc(User, Book);
mongoose.connect(db.url); // connect to our mongoDB database

//favicon middleware
app.use(favicon(__dirname + '/favicon.png'));  

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/www')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
var server = http.createServer(app);

server.listen(port, function() {
  console.log('Magic happens on port ' + port); 			// shoutout to the user
});
exports = module.exports = app; 						// expose app
