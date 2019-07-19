const express = require('express');
const middleware = require('./server/middleware');
const app = express();
const Coin = require('./coin/coin');

middleware(app);

const awardconfig = {
    name: "award",
    symbol: "AWA",
    update_timeout: 10,
    check_timeout: 250,
    wallet: {
        host: "localhost",
        port: 19915,
        user: "sha1",
        pass: "sha1",
        timeout: 8000
    },
}

const award = new Coin(awardconfig);

app.use(`/api/award`, award.router);
app.listen(3000, () => {
    console.log(`Crypto-API running on port 3000`);
});
    