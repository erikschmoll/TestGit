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
    }
}
module.exports = new StatsController();
