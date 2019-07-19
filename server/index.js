require('babel-polyfill');
const cluster = require('cluster');

// Master
if (cluster.isMaster) {
    let cpus = require('os').cpus().length;
    if (cpus > 4) {
        cpus = 4;
    }

    if (process.argv.length > 2 && !isNaN(process.argv[2])) {
        cpus = parseInt(process.argv[2], 10);
    }

    console.log('Start', cpus, 'workers');
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        cluster.fork();
    });
}
// Worker
else {
    const getList = require('../global/getList');
    const setupMongoDb = require('../services/mongo-setup');
    setupMongoDb('global');
    const config = require('../initial/settings');
    const express = require('express');
    const middleware = require('./middleware');
    const app = express();
    require('./cronJobs');
    middleware(app);
    
    let router = express.Router();
    app.use('/api', router);
    require('../global/router/userRouter')(router);
    getList().then(data=>{
        data.map(i=>{
            app.use(`/api/${i.coinId}`, i.router)
        })
    })
    app.listen(config.port, () => {
        console.log(`Crypto-API running on port ${ config.port }`);
    });
    module.exports =  app;
}
