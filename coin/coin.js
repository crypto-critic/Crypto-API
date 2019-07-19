const RPC = require('./rpc/rpc');
const Connection = require('./connection');
const CoinX = require('./blockchain-models/coin');
const Block = require('./blockchain-models/block');
const Masternode = require('./blockchain-models/masternode');
const Peer = require('./blockchain-models/peer');
const Rich = require('./blockchain-models/rich');
const TX = require('./blockchain-models/tx');
const UTXO = require('./blockchain-models/utxo');
const BlockReward = require('./blockchain-models/blockreward');
const Market = require('./market-models/market/market');
const Router = require('./router/createRouter');
const getDataFromCoingecko = require('../lib/getDataFromCoingecko');

class Coin {
    constructor(object){
        this.coinId = object.coinId;
        this.connection = new Connection(object.coinId).connection;
        this.rpc = new RPC(object.wallet);
        this.block = new Block(this.connection).model;
        this.coin = new CoinX(this.connection).model;
        this.masternode = new Masternode(this.connection).model;
        this.peer = new Peer(this.connection).model;
        this.rich = new Rich(this.connection).model;
        this.tx = new TX(this.connection).model;
        this.utxo = new UTXO(this.connection).model;
        this.blockreward = new BlockReward(this.connection).model;
        this.market = new Market(this.connection).model;
        this.router = new Router(this).router;
    }
}
module.exports = Coin;