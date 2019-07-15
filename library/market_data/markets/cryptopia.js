var axios = require('axios'); 
var base_url = 'https://www.cryptopia.co.nz/api/GetMarket/';

module.exports = {
    get_data: async (id) => {
        let res = await axios.get(base_url+id);
        let a = res.data.Data;
        let summary = {
            price: parseFloat(a.LastPrice),
            change: parseFloat(a.Change),
            volume: parseFloat(a.Volume),
            //market_cap: parseFloat(a.market_cap)
        }
        return summary;
    }
};
