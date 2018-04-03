var express = require('express');
var timeout = require('connect-timeout');
//var sqlinjection = require('sql-injection');

global.MODELES= require('../model');
global.HELPERS= require('../helper');
global.CONFIG = require('config');
global.RESPOND=require('../helper/general/makeResponse');
global.CONSTANT = require('../config/constants');
global.PARAMS = require('../config/params');

var notfound = require('./404') ;
var app = express();

// error handler
app.use(require('./error_handler'));
app.use(require('./timeout'));
app.use(timeout('60s'));

// app.use(sqlinjection);  // add sql-injection middleware here

var bodyParser = require('body-parser');
var index = require('./index');
var controller = require('../controller') ;

app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/WS/*', index);
app.use('/WS/' , controller) ;

app.use(notfound);

module.exports = app;
