const express = require('express');

class Router {
    constructor(coin){
        const blockex = require('./blockex')(coin);
        const iquidus = require('./iquidus')(coin);
        const chain = require('./chainRouter')(coin);
        const market = require('./marketRouter')(coin);
        const router = express.Router();
        router.get('/address/:hash', blockex.getAddress);
        // router.get('/block/average', blockex.getAvgBlockTime);
        router.get('/block/is/:hash', blockex.getIsBlock);
        router.get('/block/:hash', blockex.getBlock);
        router.get('/coin', blockex.getCoin);
        router.get('/coin/history', blockex.getCoinHistory);
        router.get('/coin/week', blockex.getCoinsWeek());
        router.get('/coin/month', blockex.getCoinsMonth());
        router.get('/masternode', blockex.getMasternodes);
        router.get('/masternode/average', blockex.getAvgMNTime());
        router.get('/masternode/:hash', blockex.getMasternodeByAddress);
        router.get('/masternodecount', blockex.getMasternodeCount);
        router.get('/peer', blockex.getPeer);
        router.get('/currentsupply', blockex.getSupply);
        router.get('/top100', blockex.getTop100);
        router.get('/alladdrs', blockex.getAllAddrs);
        router.get('/walletcount', blockex.getWalletCount);
        router.get('/tx', blockex.getTXs);
        router.get('/tx/latest', blockex.getTXLatest);
        router.get('/tx/week', blockex.getTXsWeek());
        router.get('/tx/month', blockex.getTXsMonth());
        router.get('/tx/:hash', blockex.getTX);
        router.get('/getdifficulty', iquidus.getdifficulty);
        router.get('/getconnectioncount', iquidus.getconnectioncount);
        router.get('/getblockcount', iquidus.getblockcount);
        router.get('/getblockhash', iquidus.getblockhash);
        router.get('/getblock', iquidus.getblock);
        router.get('/getrawtransaction', iquidus.getrawtransaction);
        router.get('/getnetworkhashps', iquidus.getnetworkhashps);
        router.get('/chainblocktime', chain.chainBlockTime);
        router.get('/chainblockreward', chain.chainBlockReward);
        router.get('/chainmasternoderatio', chain.chainMasternodeRatio);
        router.get('/collateral', chain.chainCollateral);
        router.get('/totalsupply', chain.totalSupply);
        router.get('/marketdata', market.GetMarketData);
        this.router = router;
    }
}

module.exports = Router;