require('babel-polyfill');
const exit = require('../library/exit');
const locker = require('../library/locker');
const getList = require(`../global/getList`);
 var rich = async coin => {
    // Models.
    const Rich = await coin.rich;
    const UTXO = await coin.utxo;
    async function syncRich() {
        await Rich.remove({});
        const addresses = await UTXO.aggregate([
            { $group: { _id: '$address', sum: { $sum: '$value' } } },
            { $sort: { sum: -1 } }
        ]);
        await Rich.insertMany(addresses.filter(addr => addr._id !== 'ZEROCOIN').map(addr => ({
            address: addr._id,
            value: addr.sum
        })));
    }
    async function update() {
        const type = 'rich';
        let code = 0;

        try {
            locker.lock(coin.coinId, type);
            await syncRich();
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
const syncRichDetail = () => getList().then(data => {
    if(data!==null) {data.map(i => {
        rich(i);
    })};
});

module.exports = syncRichDetail;