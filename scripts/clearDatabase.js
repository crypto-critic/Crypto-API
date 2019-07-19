require('babel-polyfill');
const exit = require('../lib/exit');
const locker = require('../lib/locker');

module.exports = async coin => {
    // Models.
    const Block = await coin.block;
    const Coin = await coin.coin;
    const Masternode = await coin.masternode;
    const Peer = await coin.peer;
    const Rich = await coin.rich;
    const TX = await coin.tx;
    const UTXO = await coin.utxo;
    const BlockReward = await coin.blockreward;
    async function clearDatabase() {
        await Block.remove({});
        await Coin.remove({});
        await Masternode.remove({});
        await Peer.remove({});
        await Rich.remove({});
        await TX.remove({});
        await UTXO.remove({});
        await BlockReward.remove({});
    }
    async function update() {
        let code = 0;
        try {
            locker.lock(coin.coinId,'block');
            locker.lock(coin.coinId,'coin');
            locker.lock(coin.coinId,'masternode');
            locker.lock(coin.coinId,'peer');
            locker.lock(coin.coinId,'rich');
            locker.lock(coin.coinId,'tx');
            locker.lock(coin.coinId,'utxo');
            locker.lock(coin.coinId,'blockreward');
            await clearDatabase();
        } catch(err) {
            console.log(err);
            code = 1;
        } finally {
            try {
                locker.unlock(coin.coinId,'block');
                locker.unlock(coin.coinId,'coin');
                locker.unlock(coin.coinId,'masternode');
                locker.unlock(coin.coinId,'peer');
                locker.unlock(coin.coinId,'rich');
                locker.unlock(coin.coinId,'tx');
                locker.unlock(coin.coinId,'utxo');
                locker.unlock(coin.coinId,'blockreward');
            } catch(err) {
                console.log(err);
                code = 1;
            }
            exit(code);
        }
    }
    update();
};