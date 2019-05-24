// npm middleware packages
var express = require("express");
var session = require('express-session');
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var app = express();
var passport = require('passport');

app.use(bodyParser.urlencoded({ extended: true })); //For body parser
app.use(bodyParser.json());

app.use(express.static("build"));


// Passport 
app.use(passport.initialize());
app.use(passport.session());

// Router
var routes = require('./router/api')(app);
app.use('/',routes);


// Port listening and logging 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
