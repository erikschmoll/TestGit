'use strict'
const StorageServ = require('./storage.service')
const _ = require('underscore')


class StatsService {
    constructor(){
        var only = 0
        var stats = {
            request: 0,
            numUsers: 10,
            numUsersActiveToday: 10,
            numStoriesToday: 10,
            numFastStoriesToday: 10,
            numStories: 10,
            numUsersMessages: 10,
            numUsersMessagesToday: 10,
            numAcceptedContactsToday: 10
        }
        StorageServ.save("stats", stats, (error, id)=>{})

        this.post = (type)=>{
            return new Promise((resolve, reject)=>{
                try{
                    StorageServ.loadAll("stats",(error, stats)=>{
                        if(stats[only][type]){
                            stats[only][type] = stats[only][type] + 1
                            stats[only]["request"] = stats[only]["request"] + 1
                            StorageServ.update("stats", stats[only], (error, stats)=>{
                                delete stats.request
                                delete stats.id
                                resolve(stats)
                            })
                        }
                        else{
                            reject(new Error("Not found"))
                        }
                    })
                }
                catch(e){
                    reject(e)
                }
            })
        }
        this.get = ()=>{
            return new Promise((resolve, reject)=>{
                try{
                    StorageServ.loadAll("stats",(error, stats)=>{
                        stats[only]["request"] = stats[only]["request"] + 1
                        StorageServ.update("stats", stats[only], (error, stats)=>{
                            delete stats.request
                            delete stats.id
                            resolve(stats)
                        })
                    })
                }
                catch(e){
                    reject(e)
                }
            })
        }
        this.ping = ()=>{
            return new Promise((resolve, reject)=>{
                try{
                    resolve({
                        code: 0,
                        message: "active"
                      })
                }
                catch(e){
                    reject(e)
                }
            })
        }
        this.requests = (args)=>{
            return new Promise((resolve, reject)=>{
                try{
                    var req = []
                    var hours = [
                      '00','01','02','03','04','05',
                      '06','07','08','09','10','11',
                      '12','13','14','15','16','17',
                      '18','19','20','21','22','23']
                    var max = 10, min = 0
                    var res = []
                    hours.forEach((hour) => {
                        var count = Math.floor(Math.random() * (max - min + 1)) + min
                        req.push({
                                "hour": hour,
                                "date": "02/07/2018",
                                "count": count
                            })
                    });
                    var nfrom = Number(args.from)
                    var nto = Number(args.to)
                    req.forEach(r => {
                      var nhour = Number(r.hour)
                      if(nhour>=nfrom && nhour<=nto){
                        res.push(_.clone(r))
                      }
                    });
                    resolve(res)
                }
                catch(e){
                    console.error(e)
                    reject(e)
                }
            })
        }
    }
}

module.exports = new StatsService();
