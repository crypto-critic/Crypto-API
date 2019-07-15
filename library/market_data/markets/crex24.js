// https://api.crex24.com/CryptoExchangeService/BotPublic/ReturnTicker?request=[NamePairs=BTC_MNEX]

var axios = require('axios'); 
var base_url = 'https://api.crex24.com/CryptoExchangeService/BotPublic/ReturnTicker?request=[NamePairs=';

module.exports = {
    get_data: async (id) => {
        let res = await axios.get(base_url+id+']');
        let a = res.data.Tickers[0];
        let summary = {
            price: a.Last,
            change: a.PercentChange,
            volume: a.BaseVolume,
            //market_cap: parseFloat(a.market_cap)
        }
        return summary;
    }
};