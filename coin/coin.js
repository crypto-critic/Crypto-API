const RPC = require('./rpc/rpc');
const Connection = require('./connection');
const createRouter = require('./router/createRouter');
const coin = require('./blockchain-models/coin');
const Block = require('./blockchain-models/block');
const masternode = require('./blockchain-models/masternode');
const peer = require('./blockchain-models/peer');
const rich = require('./blockchain-models/rich');
const tx = require('./blockchain-models/tx');
const utxo = require('./blockchain-models/utxo');
const blockreward = require('./blockchain-models/blockreward');
const router = require('./router/createRouter');

export class Coin {
    constructor(object){
        this.name = object.name;
        this.connection = new Connection(object.name);
        this.rpc = new RPC(object.wallet);
        this.block = new Block(this.connection);
        this.coin = new coin.Coin(this.connection).model;
        this.masternode = new masternode.Masternode(this.connection).model;
        this.peer = new peer.Peer(this.connection).model;
        this.rich = new rich.Rich(this.connection).model;
        this.tx = new tx.TX(this.connection).model;
        this.utxo = new utxo.UTXO(this.connection).model;
        this.blockreward = new blockreward.BlockReward(this.connection).model;
        this.router = new router.Router(this).router;
        // this.marketData = {};
        // this.syncMarketData();
    }
    syncMarketData(){
        console.log('sync market data')
    }
}