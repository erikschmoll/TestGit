'use strict'
const StorageServ = require('./storage.service')


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
        this.ping = (id)=>{
            return new Promise((resolve, reject)=>{
                
            })
        }
    }
}

module.exports = new StatsService();
