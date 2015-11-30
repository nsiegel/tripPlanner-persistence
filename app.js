var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');

var app = express();

// swig rendering boilerplate
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// statically serve front-end dependencies
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

// serve any other static files
app.use(express.static(__dirname + '/public'));

// serve dynamic routes
app.use(require('./routes'));
app.use(require('./routes/api/days'));

// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log({ error: err });
  res.render('error', {
  	error: err
  });
});

// listen on a port
var port = 3000;
app.listen(port, function () {
	console.log('The server is listening closely on port', port);
});
