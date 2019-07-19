require('babel-polyfill');
const exit = require('../library/exit');
const fetch = require('../library/fetch');
const locker = require('../library/locker');
const moment = require('moment');
const getList = require(`../global/getList`);

var coin = async (coin) => {
    const Rich = await coin.rich;
    const Coin = await coin.coin;
    const rpc = await coin.rpc;
    async function syncCoin() {
        const date = moment().utc().startOf('minute').toDate();
        const info = await rpc.call('getinfo');
        const masternodes = await rpc.call('getmasternodecount');
        const nethashps = await rpc.call('getnetworkhashps');
        var activewallets = 0;
        await Rich.find({ 'value': { $gt: 0 } }).countDocuments(function(err, count) {
            if (err) { console.log(err) }
            activewallets = count;
        });

        const coinx = new Coin({
            createdAt: date,
            blocks: info.blocks,
            diff: info.difficulty,
            mnsOff: masternodes.total - masternodes.stable,
            mnsOn: masternodes.stable,
            netHash: nethashps,
            peers: info.connections,
            status: 'Online',
            supply: info.moneysupply,
        });
        await coinx.save();
    }
    async function update() {
        const type = 'coin';
        let code = 0;

        try {
            locker.lock(coin.coinId, type);
            await syncCoin();
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

const syncCoinDetail = () => getList().then(data => {
    data.map(i => {
        coin(i);
    });
});

module.exports = syncCoinDetail;