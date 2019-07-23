require('babel-polyfill');

const getList = require('../global/getList');
const config = require('../initial/settings');
const express = require('express');
const middleware = require('./middleware');
const app = express();
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
