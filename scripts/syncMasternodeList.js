require('babel-polyfill');
const exit = require('../library/exit');
const fetch = require('../library/fetch');
const {forEach} = require('p-iteration');
const locker = require('../library/locker');
const moment = require('moment');
const getList = require(`../global/getList`);
// Models.
var masternode = async (coin) => {
    const Masternode = await coin.masternode;
    const rpc = await coin.rpc;
    async function syncMasternode() {
        const date = moment().utc().startOf('minute').toDate();
        await Masternode.deleteMany({});
        rpc.timeout(10000); // 10 secs
        const mns = await rpc.call('masternode', ['list']);
        const inserts = [];
        await forEach(mns, async (mn) => {
            const masternode = new Masternode({
                active: mn.activetime,
                addr: mn.addr,
                createdAt: date,
                lastAt: new Date(mn.lastseen * 1000),
                lastPaidAt: new Date(mn.lastpaid * 1000),
                network: mn.network,
                rank: mn.rank,
                status: mn.status,
                txHash: mn.txhash,
                txOutIdx: mn.outidx,
                ver: mn.version
            });
            inserts.push(masternode);
        });
        if (inserts.length) {
            await Masternode.insertMany(inserts);
        }
    }
    async function update() {
        const type = 'masternode';
        let code = 0;
        try {
            locker.lock(coin.coinId, type);
            await syncMasternode();
        } catch(err) {
            console.log(err);
            code = 1;
        } finally {
            try {
                locker.unlock(coin.coinId, type);
            } catch(err) {
                console.log(err);
                code = 1;
            }
            // exit(code);
        }
    }
    update();
};
const syncMasternodeDetail = () => getList().then(data => {
    data.map(i => {
        masternode(i);
    });
});

module.exports = syncMasternodeDetail;