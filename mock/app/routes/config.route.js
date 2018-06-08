'use strict'
var RouterHandler = require('../routes/router');
var StatsCtrl     = require('../controllers/stats.controller')


RouterHandler.addEndpointWithOutAuth({
    verb: 'get',
    path: '/stats/:type',
    handler: StatsCtrl.post
});
RouterHandler.addEndpointWithOutAuth({
    verb: 'get',
    path: '/stats',
    handler: StatsCtrl.get
});
