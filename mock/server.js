'use strict';
/*
 * This is only an express server example
 */
const express = require('express');
var config = require('config');
var routerNode = require('express').Router();
                 require('./app/routes/config.route');
var RouterHandler = require('./app/routes/router')
var bodyParser = require('body-parser');

//Constants
const PORT = process.env.PORT || config.get('server.port');

const HOST = config.get('server.host');

const app = express();

// set middleware parse json
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true })); 

//user-defined middleware
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', "Authorization, Content-Type");
  next();
});

//routes
RouterHandler.loadRoutes(routerNode);
app.use('/api/v1', routerNode);

// App config
app.get('/', (req, res) => {
  res.send('app-server mock [appMock]\n');
});


//start
var server = app.listen(PORT, HOST);
console.log('server started and listening on ' + HOST + ':' + PORT);

//to start and stop in tests
module.exports = server;
