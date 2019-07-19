const moment = require('moment');
const cache = require('../../lib/cache');
module.exports =  (coin) => {
    const rpc =  coin.rpc;
    const Block = coin.block;
    const Coin = coin.coin;
    const chain = require(`../../initial/${coin.coinId}chain`);
    const chainBlockTime = async (req, res) => {
        let blocktime = await chain.avgBlockTime;
        res.json({blocktime: blocktime});
    };
    const chainBlockReward = async (req, res) => {
        let info = await rpc.call('getinfo');
        let nHeight = info.blocks;
        let blockreward = await chain.getSubsidy(nHeight);
        res.json({blockreward})
    };
    const chainMasternodeRatio = async (req, res) =>{
        let info = await rpc.call('getinfo');
        let nHeight = info.blocks;
        const coin = await Coin.findOne().sort({ createdAt: -1 });
        let nMasternodeCount = coin.mnsOff + coin.mnsOn;
        let nMoneySupply = await cache.getFromCache("supply", moment().utc().add(1, 'hours').unix(), async() => {
            const utxo = await UTXO.aggregate([
                { $group: { _id: 'supply', total: { $sum: '$value' } } }
            ]);
            t = utxo[0].total;
            return t;
        });
        let mnratio = chain.mnratio(nHeight, nMasternodeCount, nMoneySupply)
        res.json({mnratio})
    };
    const chainCollateral = async (req, res) =>{
        let collateral = await chain.mncoins;
        res.json({collateral: collateral})
    };
    const totalSupply = (req, res) =>{
        let totalSupply = chain.totalSupply;
        res.json({totalsupply})
    };
    return {
        chainBlockTime,
        chainBlockReward,
        chainMasternodeRatio,
        chainCollateral,
        totalSupply
    }
};