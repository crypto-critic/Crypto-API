require('babel-polyfill');
var coin_array = require('../../initial/coin_array');
var axios = require('axios');

var getmasternodecount = async (link) => {
    var data = await axios.get(link);
    return data.data.total;
};
var getcurrentsupply = async (link) => {
    var data = await axios.get(link);
    return data.data.t;
};
var getdifficulty = async (link) => {
    var data = await axios.get(link);
    return data.data;
};
var getconnectioncount = async (link) => {
    var data = await axios.get(link);
    return data.data;
};
var getblockcount = async (link) => {
    var data = await axios.get(link);
    return data.data;
};
var getblocktime = async (link) => {
    var data = await axios.get(link);
    return data.data.blocktime/60;
};
var getblockreward = async (link) => {
    var data = await axios.get(link);
    return data.data.blockreward;
};
var gettotalsupply = async (link) => {
    var data = await axios.get(link);
    return data.data.totalsupply;
};
var getcurrentcollateral = async (link) => {
    var data = await axios.get(link);
    return data.data.collateral;
};
var getcurrentratio = async (link) => {
    var data = await axios.get(link);
    return data.data.mnratio;
};
var getBlockchainData = async (coin) => {
    var host = require(`./server/initial`).host;
    // console.log(host);
    var result =  {
        current_block: await getblockcount(host + 'getblockcount'),
        block_time_in_minuntes: await getblocktime(host + 'chainblocktime'),
        block_reward: await getblockreward(host + 'chainblockreward'),
        total_supply: await gettotalsupply(host + 'totalsupply'),
        current_collateral: await getcurrentcollateral(host + 'collateral'),
        current_ratio: await getcurrentratio(host + 'chainmasternoderatio'),
        current_mn: await getmasternodecount(host + 'masternodecount'),
        current_supply: await getcurrentsupply(host + 'currentsupply'),
        difficulty: await getdifficulty(host + 'getdifficulty')
    };
    return result;
};

module.exports = {
    get_data: getBlockchainData
    // get_all_data: get_all_data
};
