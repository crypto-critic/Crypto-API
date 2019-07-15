var axios = require('axios');
const key = '79003ad3059d020c';
var base_url = 'https://coinlib.io/api/v1/coin?key='+key+'&pref=BTC&symbol=';

module.exports = {
    get_data: async (coinlib_id) => {
        let res = await axios.get(base_url+coinlib_id);
        let a = res.data;
        let summary = {
            price: parseFloat(a.price),
            change: parseFloat(a.delta_24h),
            volume: parseFloat(a.total_volume_24h),
            marketcap: parseFloat(a.market_cap)
        }
        return summary;
    }
};
