var coingecko = require('../market_data/markets/coingecko');
var coinlib = require('../market_data/markets/coinlib');
var cmc = require('../market_data/markets/cmc');
var coin_array = require('../../initial/coin_array');
var coinbaseurl = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC';
var coingeckourl = 'https://api.coingecko.com/api/v3/coins/bitcoin';

var get_data = (id) => new Promise((res, rej)=>{
    coingecko.get_coin(id).then(data => {
      if (data == null){
        console.log('Coinlib setup');
          console.log('CMC setup')
      } else {res(data)}
    })
});

module.exports = {
  get_data: get_data,
};