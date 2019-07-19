const axios = require('axios');
const getDataFromCoingecko = async (coingecko_id) => {
    let base_url = 'https://api.coingecko.com/api/v3/coins/';
    let sparkline = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d'
    let res = await axios.get(base_url+coingecko_id);
    if (res){
        let data = res.data;
        let summary = {
            coinId: coingecko_id,
            market_data: {
                current_price: data.market_data.current_price,
                total_volume: data.market_data.total_volume,
                high_24h: data.market_data.high_24h,
                low_24h: data.market_data.low_24h,
                price_change_24h: data.market_data.price_change_24h,
                price_change_percentage_24h: data.market_data.price_change_percentage_24h,
                price_change_percentage_7d: data.market_data.price_change_percentage_7d,
                price_change_percentage_14d: data.market_data.price_change_percentage_14d,
                price_change_percentage_30d: data.market_data.price_change_percentage_30d,
                price_change_percentage_60d: data.market_data.price_change_percentage_60d,
                price_change_percentage_200d: data.market_data.price_change_percentage_200d,
                price_change_percentage_1y: data.market_data.price_change_percentage_1y,
                market_cap_change_24h: data.market_data.market_cap_change_24h,
                market_cap_change_percentage_24h: data.market_data.market_cap_change_percentage_24h,
                price_change_24h_in_currency: data.market_data.price_change_24h_in_currency,
                price_change_percentage_1h_in_currency: data.market_data.price_change_percentage_1h_in_currency,
                price_change_percentage_24h_in_currency: data.market_data.price_change_percentage_24h_in_currency,
                price_change_percentage_7d_in_currency: data.market_data.price_change_percentage_7d_in_currency,
                price_change_percentage_14d_in_currency: data.market_data.price_change_percentage_14d_in_currency,
                price_change_percentage_30d_in_currency: data.market_data.price_change_percentage_30d_in_currency,
                price_change_percentage_60d_in_currency: data.market_data.price_change_percentage_60d_in_currency,
                price_change_percentage_200d_in_currency: data.market_data.price_change_percentage_200d_in_currency,
                price_change_percentage_1y_in_currency: data.market_data.price_change_percentage_1y_in_currency,
                market_cap_change_24h_in_currency: data.market_data.market_cap_change_24h_in_currency,
                market_cap_change_percentage_24h_in_currency: data.market_data.market_cap_change_percentage_24h_in_currency
            },
            // community_data: data.community_data,
            // developer_data: data.developer_data,
            last_updated: Date.now()
        }
        return summary;
    } else {
        console.log('err');
        return null;
    }
}

module.exports = getDataFromCoingecko;