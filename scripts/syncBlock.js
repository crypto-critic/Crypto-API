require('babel-polyfill');
const exit = require('../library/exit');
const { forEachSeries } = require('p-iteration');
const locker = require('../library/locker');
const getList = require(`../global/getList`);
const Coin = require('../coin/coin');

const block = async (coin) => {
    let blockchain = await require(`../initial/${coin.coinId}.chain`);
    console.log(`../initial/${coin.coinId}.chain`)
    let util = await require('./util')(coin);
    let Block = await coin.block;
    let TX = await coin.tx;
    let UTXO = await coin.utxo;
    let rpc = await coin.rpc;
    async function syncBlocks(start, stop, clean = false) {
        if (clean) {
            await Block.deleteMany({ height: { $gte: start, $lte: stop } });
            await TX.deleteMany({ blockHeight: { $gte: start, $lte: stop } });
            await UTXO.deleteMany({ blockHeight: { $gte: start, $lte: stop } });
        }
        let block;
        for (let height = start; height <= stop; height++) {
            const hash = await rpc.call('getblockhash', [height]);
            const rpcblock = await rpc.call('getblock', [hash]);
            block = new Block({
                hash,
                height,
                bits: rpcblock.bits,
                confirmations: rpcblock.confirmations,
                createdAt: new Date(rpcblock.time * 1000),
                diff: rpcblock.difficulty,
                merkle: rpcblock.merkleroot,
                nonce: rpcblock.nonce,
                prev: (rpcblock.height == 1) ? 'GENESIS' : rpcblock.previousblockhash ? rpcblock.previousblockhash : 'UNKNOWN',
                size: rpcblock.size,
                txs: rpcblock.tx ? rpcblock.tx : [],
                ver: rpcblock.version
            });
            await block.save();
            await forEachSeries(block.txs, async(txhash) => {
                const rpctx = await util.getTX(txhash, true);
                if (blockchain.isPoS(block)) {
                    console.log(coin.coinId, ' POS ', height);
                    await util.addPoS(block, rpctx);
                } else {
                    console.log(coin.coinId, ' POW ', height);
                    await util.addPoW(block, rpctx);
                }
            });
        }
    }
    async function update() {
        var rpc = coin.rpc;
        var Block = coin.block;
        const type = 'block';
        let code = 0;
        try {
            const info = await rpc.call('getinfo');
            const block = await Block.findOne().sort({ height: -1 });
            let clean = true; // Always clear for now.
            let dbHeight = block && block.height ? block.height : 1;
            let rpcHeight = info.blocks;
            // If heights provided then use them instead.
            if (!isNaN(process.argv[2])) {
                clean = true;
                dbHeight = parseInt(process.argv[2], 10);
            }
            if (!isNaN(process.argv[3])) {
                clean = true;
                rpcHeight = parseInt(process.argv[3], 10);
            }
            locker.lock(coin.coinId, type);
            if (dbHeight >= rpcHeight) {
                return;
            }
            else if (dbHeight === 0) {
                dbHeight = 1;
            }
            await syncBlocks(dbHeight, rpcHeight, clean);
        } catch (err) {
            console.log(err);
            code = 1;
        } finally {
            try {
                locker.unlock(coin.coinId, type);
            } catch (err) {
                console.log(err);
                code = 1;
            }
            // exit(code);
        }
    }
    update();
};

const syncBlock = () => getList().then(data => {
    if(data!==null) {data.map(i => {
        console.log('block ', i.coinId);
        block(i);
    })};
});

module.exports = syncBlock;
