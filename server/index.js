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
    const setupMongoDb = require('./mongo-setup');
    const config = require('../initial/settings');
    const express = require('express');
    const middleware = require('./middleware');
    const app = express();
    middleware(app);
    setupMongoDb('global');

    let router = express.Router();
    app.use("/api", router);
    require('../global/router/userRouter')(router);

    app.listen(config.port, () => {
        console.log(`Crypto-API running on port ${ config.port }`);
    });
    module.exports =  app;
}
