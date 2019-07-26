
module.exports = (coin) => {
    const GetMarketData = async (req, res) => {
        const Market = coin.market;
        let coinId = coin.coinId
        Market.findOne({coinId}, (err, i)=>{
            if (i==null){
                res.status(404).send('error: Could not find coin with given id')
            } else {
                res.status(200).json({
                    current_price: i.market_data.current_price,
                    market_cap: i.market_data.market_cap,
                    total_volume: i.market_data.total_volume,
                    high_24h: i.market_data.high_24h,
                    low_24h: i.market_data.low_24h,
                    price_change_24h: i.market_data.price_change_24h_in_currency,
                    price_change_percentage_24h: i.market_data.price_change_percentage_24h,
                    market_cap_change_24h: i.market_data.market_cap_change_24h_in_currency,
                    market_cap_change_percentage_24h: i.market_data.market_cap_change_percentage_24h,
                    ROI: i.income_data.ROI,
                    dailyIncome: i.income_data.dailyIncome,
                    weeklyIncome: i.income_data.weeklyIncome,
                    monthlyIncome: i.income_data.monthlyIncome,
                    yearlyIncome: i.income_data.yearlyIncome,
                    masternodeWorth: i.income_data.masternodeWorth                     
                });
            }
        })    
    }

    return {
        GetMarketData
    }
};
