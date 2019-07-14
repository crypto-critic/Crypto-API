
module.exports =  (coin) => {
    var rpc =  coin.rpc;
    var Block = coin.block;
    var Coin = coin.coin;
    var chain = require(`../../initial/${coin.name}chain`);
    const chainBlockTime = async (req, res) => {
        var blocktime = await chain.avgBlockTime;
        res.json({blocktime: blocktime});
    };
    const chainBlockReward = async (req, res) => {
        var info = await rpc.call('getinfo');
        var nHeight = info.blocks;
        var reward = await chain.getSubsidy(nHeight);
        res.json({blockreward: reward})
    };
    const chainMasternodeRatio = async (req, res) =>{
        // const mn = await Coin.findOne().sort({ createdAt: -1 });
        // var masternodeCount = mn.mnsOn;
        res.json({mnratio: 0.8})
    };
    const chainCollateral = async (req, res) =>{
        var collateral = await chain.mncoins;
        res.json({collateral: collateral})
    };
    const totalSupply = async (req, res) =>{
        var total = await chain.gettotalSupply;
        res.json({totalsupply: total})
    };
    return {
        chainBlockTime,
        chainBlockReward,
        chainMasternodeRatio,
        chainCollateral,
        totalSupply
    }
};