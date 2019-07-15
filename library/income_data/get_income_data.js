var market = require('../market_data/get_market_data');
var blockchain = require('../blockchain_data/get_blockchain_data');
var fx = (k) => new Promise((res, rej) => {
    res( {
        roi: 24*60/k.block_time_in_minuntes*k.block_reward*k.current_ratio/k.current_mn/k.current_collateral*36500,
        coin: 24*60/k.block_time_in_minuntes*k.block_reward*k.current_ratio/k.current_mn,
        collateral: k.current_collateral
    })
});
var income = (income, price) => new Promise((res, rej) =>{
    res({
        coin: income,
        aed: income*price.aed,
        ars: income*price.ars,
        aud: income*price.aud,
        bch: income*price.bch,
        bdt: income*price.bdt,
        bhd: income*price.bhd,
        bmd: income*price.bmd,
        bnb: income*price.bnb,
        brl: income*price.brl,
        btc: income*price.btc,
        cad: income*price.cad,
        chf: income*price.chf,
        clp: income*price.clp,
        cny: income*price.cny,
        czk: income*price.czk,
        dkk: income*price.dkk,
        eos: income*price.eos,
        eth: income*price.eth,
        eur: income*price.eur,
        gbp: income*price.gbp,
        hkd: income*price.hkd,
        huf: income*price.huf,
        idr: income*price.idr,
        ils: income*price.ils,
        inr: income*price.inr,
        jpy: income*price.jpy,
        krw: income*price.krw,
        kwd: income*price.kwd,
        lkr: income*price.lkr,
        ltc: income*price.ltc,
        mmk: income*price.mmk,
        mxn: income*price.mxn,
        myr: income*price.myr,
        nok: income*price.nok,
        nzd: income*price.nzd,
        php: income*price.php,
        pkr: income*price.pkr,
        pln: income*price.pln,
        rub: income*price.rub,
        sar: income*price.sar,
        sek: income*price.sek,
        sgd: income*price.sgd,
        thb: income*price.thb,
        try: income*price.try,
        twd: income*price.twd,
        usd: income*price.usd,
        vef: income*price.vef,
        vnd: income*price.vnd,
        xag: income*price.xag,
        xau: income*price.xau,
        xdr: income*price.xdr,
        xlm: income*price.xlm,
        xrp: income*price.xrp,
        zar: income*price.zar,
    })
})
var get_data = (k, market) => new Promise((res, rej) =>{
    fx(k).then(result => {
        Promise.all([
            income(result.coin, market.market_data.current_price),
            income(7*result.coin, market.market_data.current_price),
            income(30*result.coin, market.market_data.current_price),
            income(365*result.coin, market.market_data.current_price),
            income(result.collateral, market.market_data.current_price),
        ]).then(([
            daily_income,
            weekly_income,
            monthly_income,
            yearly_income,
            masternode_worth
        ])=>{ res({
            roi: result.roi,
            daily_income: daily_income,
            weekly_income: weekly_income,
            monthly_income: monthly_income,
            yearly_income: yearly_income,
            masternode_worth: masternode_worth
        })}) 
    })
})
var get_all_data = (coin) => new Promise((res, rej) => {
    Promise.all([
        market.get_data(coin),
        blockchain.get_data(coin)
    ]).then(([market, blockchain])=>{
        get_data(blockchain, market).then(income => {
            res({
                market_data: market,
                blockchain_data: blockchain,
                income_data: income
            })
        })
    })
})
module.exports = {
    get_income_data: get_data,
    get_all_data: get_all_data
};