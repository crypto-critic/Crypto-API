var axios = require('axios'); 
var base_url = 'https://api.crypto-bridge.org/api/v1/ticker/';

module.exports = {
    get_data: async (id) => {
        let res = await axios.get(base_url+id);
        let a = res.data;
        let summary = {
            price: parseFloat(a.last),
            change: parseFloat(a.percentChange),
            volume: parseFloat(a.volume),
            //market_cap: parseFloat(a.market_cap)
        }
        return summary;
    }
};
