const getList = require(`../global/getList`);
const getDataFromCoingecko = require('../library/getDataFromCoingecko');
const cache = require('../library/cache');
const moment = require('moment');

const syncMarket =  async (coin) => {
    const Market = coin.market;
    const UTXO = coin.utxo;
    const Coin = coin.coin;
    const Rpc = coin.rpc;
    const chain = await require(`../initial/${coin.coinId}chain`);

    let coinCollection = await Coin.findOne().sort({ createdAt: -1 });
    let coinId = coin.coinId;
    let data = await getDataFromCoingecko(coin.coinId);
    let market_data = data.market_data;
    let info = Rpc.call('getinfo');
    let nHeight = info.blocks;
    let nMasternodeCount = coinCollection.mnsOff + coinCollection.mnsOn;
    let nMoneySupply = await cache.getFromCache("supply", moment().utc().add(1, 'hours').unix(), async() => {
            const utxo = await UTXO.aggregate([
                { $group: { _id: 'supply', total: { $sum: '$value' } } }
            ]);
            t = utxo[0].total;
            return t;
        });
    let nSubsidy = chain.getSubsidy(nHeight);
    let mnratio = chain.getMNSubsidy(nHeight, nMasternodeCount, nMoneySupply);
    let colateral = chain.colateral;
    let ROI = chain.getMNBlocksPerYear(nMasternodeCount)*nSubsidy*mnratio/colateral*100 || 0;
    let coinPerDay = chain.getMNBlocksPerDay(nMasternodeCount)*nSubsidy*mnratio || 0;
    let dailyIncome = {coin: coinPerDay};
    let weeklyIncome = {coin: coinPerDay*7};
    let monthlyIncome = {coin: coinPerDay*30};
    let yearlyIncome = {coin: coinPerDay*365.25};
    let masternodeWorth = {coin: colateral};
    let market_cap = {}
    await Object.keys(market_data.current_price).forEach(key => {
        dailyIncome[key] = market_data.current_price[key]*coinPerDay;
        weeklyIncome[key] = market_data.current_price[key]*coinPerDay*7;
        monthlyIncome[key] = market_data.current_price[key]*coinPerDay*30;
        yearlyIncome[key] = market_data.current_price[key]*coinPerDay*365.25;
        masternodeWorth[key] = market_data.current_price[key]*colateral;
        market_cap[key] = market_data.current_price[key]*nMoneySupply;
    });
    market_data = {...market_data, market_cap}
    let income_data = {ROI, dailyIncome, weeklyIncome, monthlyIncome, masternodeWorth}
    await Market.findOneAndUpdate(
        {coinId},
        { $set: {
            market_data,
            income_data,
            last_updated: data.last_updated
        }},
        {upsert: true, new: true},
        () => console.log('finish')
    )
};
const syncMarketData = () => getList().then(data => {
    if(data!==null) {data.map(i => {
        syncMarket(i);
    })};
});
syncMarketData();

module.exports = syncMarketData;
