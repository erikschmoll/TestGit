const messages    = require('../../config/messages')
const ResServ     = require('../services/response.service')
const ResEnum     = require('../common/response.enum')
const StatsServ     = require('../services/stats.service')

class StatsController {
    constructor() {
        this.post = (req, res, next) => {
            try{
                var type = req.params.type;
                StatsServ.post(type)
                .then((stats) => {
                    ResServ.ok(ResEnum.Value, "stats", stats, res, next);
                })
                .catch((e) => {
                    ResServ.error(res, messages.BadRequest);
                });
            }
            catch(e){
                ResServ.error(res, messages.InternalServerError);
            }

        };
        
        this.get = (req, res, next) => {
            try{
                StatsServ.get()
                .then((stats) => {
                    ResServ.ok(ResEnum.Value, "stats", stats, res, next);
                })
                .catch((e) => {
                    ResServ.error(res, messages.BadRequest);
                });
            }
            catch(e){
                ResServ.error(res, messages.InternalServerError);
            }
        };

        this.ping = (req, res, next) => {
            try{
                StatsServ.ping()
                .then((ping) => {
                    ResServ.ok(ResEnum.Value, "ping", ping, res, next);
                })
                .catch((e) => {
                    ResServ.error(res, messages.BadRequest);
                });
            }
            catch(e){
                ResServ.error(res, messages.InternalServerError);
            }
        };

        this.requests = (req, res, next) => {
            try{
                StatsServ.requests(req.query)
                .then((requests) => {
                    //ResServ.ok(ResEnum.Value, "requests", requests, res, next);
                    res.status(200);
                    res.json(requests);
                    next();
                })
                .catch((e) => {
                    ResServ.error(res, messages.BadRequest);
                });
            }
            catch(e){
                ResServ.error(res, messages.InternalServerError);
            }
        };
    }
}
module.exports = new StatsController();
