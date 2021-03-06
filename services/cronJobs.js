const syncBlock = require('../scripts/syncBlock');
const syncCoinDetail = require('../scripts/syncCoinDetail');
const syncMasternodeList = require('../scripts/syncMasternodeList');
const syncRichList = require('../scripts/syncRichList');
const syncPeerList = require('../scripts/syncPeerList');
const syncMarketData = require('../scripts/syncMarketData');
const CronJob = require('cron').CronJob;

const everyMintute = '*/1 * * * *' // Job every minute
const twoMintutes = '*/2 * * * *' // Job 2 mitutes
const fourMintutes = '*/4 * * * *' // Job 4 mitutes

const syncBlockJob = new CronJob(
    everyMintute,
    () => {syncBlock()},
    () => console.log('Synced Block!')
)
const syncCoinDetailJob = new CronJob(
    twoMintutes,
    () => {syncCoinDetail()},
    () => console.log('Synced CoinDetail!')
)
const syncMasternodeListJob = new CronJob(
    twoMintutes,
    () => {syncMasternodeList()},
    () => console.log('Synced MasternodeList!')
)
const syncPeerListJob = new CronJob(
    fourMintutes,
    () => {syncPeerList()},
    () => console.log('Synced PeerList!')
)
const syncRichListJob = new CronJob(
    fourMintutes,
    () => {syncRichList()},
    () => console.log('Synced RichList!')
)
const syncMarketDataJob = new CronJob(
    twoMintutes,
    () => {syncMarketData()},
    () => console.log('Synced Market data')
)

syncBlockJob.start();
syncCoinDetailJob.start();
syncMasternodeListJob.start();
syncPeerListJob.start();
syncRichListJob.start();
syncMarketDataJob.start();