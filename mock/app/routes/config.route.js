'use strict'
var RouterHandler = require('../routes/router');
var AppCtrl     = require('../controllers/app.controller')


RouterHandler.addEndpointWithOutAuth({
    verb: 'get',
    path: '/stats/:id',
    handler: AppCtrl.stats
});
RouterHandler.addEndpointWithOutAuth({
    verb: 'get',
    path: '/ping/:id',
    handler: AppCtrl.ping
});
