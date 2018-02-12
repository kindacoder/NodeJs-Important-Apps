
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

///requiring database configuration file
var configDB=require('./config/database');

mongoose.connect(configDB.url); //connecting to database


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


///setup view engine
app.set('view engine','ejs');
