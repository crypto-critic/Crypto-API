
module.exports = (coin)=>{
    // router.get('/coins/markets', 
    // const GetRankingCoin = async (req, res) => {
    //     // let id = req.query.id;
    //     // let category = req.query.category;
    //     let vs_currency = req.query.vs_currency;
    //     if (!vs_currency){
    //         res.status(404).json({message: 'error: Require vs_currency'})
    //     } else {
    //         let data = await Market.find().sort({'market_data.total_volume': 1})
    //         Market.find({},(err, data)=>{
    //             if(data){
    //                 return res.status(200).json(
    //                     data.map(i=>{
    //                         return {
    //                             id: i.id,
    //                             current_price: i.market_data.current_price[vs_currency],
    //                             market_cap: i.market_data.market_cap[vs_currency],
    //                             total_volume: i.market_data.total_volume[vs_currency],
    //                             price_change_percentage_24h: i.market_data.price_change_percentage_24h,
    //                             ROI: i.income_data.ROI,
    //                             dailyIncome: [i.income_data.dailyIncome.coin, i.income_data.dailyIncome[vs_currency]],
    //                             masternodeWorth: [i.income_data.masternodeWorth.coin, i.income_data.masternodeWorth[vs_currency]],
    //                             last_updated: i.last_updated,
    //                         }
    //                     }))
    //             }
    //         })
    //     }
    // };

    const GetMarketData = async (req, res) => {
        const Market = coin.market;
        let coinId = coin.coinId
        Market.findOne({coinId}, (err, i)=>{
            if (i==null){
                res.status(404).send('error: Could not find coin with given id')
            } else {
                res.status(200).json({
                    coinId,
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
                    masternodeWorth: i.income_data.masternodeWorth,
                    last_updated: i.last_updated,                        
                });
            }
        })    
    }

    return {
        GetMarketData
    }
};
