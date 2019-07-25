require('babel-polyfill');
const config = require('../initial/settings');
const exit = require('../library/exit');
const fetch = require('../library/fetch');
const { forEach } = require('p-iteration');
const locker = require('../library/locker');
const moment = require('moment');
const getList = require(`../global/getList`);
// Models.
var peer = coin => {
    const Peer = coin.peer;
    const rpc = coin.rpc;
    async function syncPeer() {
        const date = moment().utc().startOf('minute').toDate();
        const peers = await rpc.call('getpeerinfo');
        const inserts = [];
        await forEach(peers, async (peer) => {
            const parts = peer.addr.split(':');
            if (parts[0].substr(0, 1) === '[') {
                return;
            }
            const url = `${ config.freegeoip.api }${ parts[0] }`;
            let geoip = await fetch(url);
            const p = new Peer({
                _id: parts[0],
                country: geoip.country,
                countryCode: geoip.countryCode,
                createdAt: date,
                ip: parts[0],
                lat: geoip.lat,
                lon: geoip.lon,
                port: parts[1] ? parts[1] : 0,
                subver: peer.subver,
                timeZone: geoip.region,
                ver: peer.version
            });
            inserts.push(p);
        });

        if (inserts.length) {
            await Peer.deleteMany,({});
            await Peer.insertMany(inserts);
        }
    }
    async function update() {
        const type = 'peer';
        let code = 0;

        try {
            locker.lock(coin.coinId, type);
            await syncPeer();
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
const syncPeerDetail = () => getList().then(data => {
    if(data!==null) {data.map(i => {
        peer(i);
    })};
});

module.exports = syncPeerDetail;