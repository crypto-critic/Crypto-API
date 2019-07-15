require('module-alias/register');
var mongoose = require('mongoose');
var market_chart = require('@models/chart/market_chart');
var blockchain_chart = require('@models/chart/blockchain_chart');
var income_chart = require('@models/chart/income_chart');
var moment = require('moment');

// var currency = require('./list_currency')
// var fx_market = (data, x) => new Promise((res, rej)=>{
//     var time_stamp = moment().valueOf()
//     Promise.all((currency.normal.map(i=>{
//         return (data.market_data[x][i])
//     }))).then(data => {
//         data.unshift(time_stamp)
//         res(data)
//     });
// })
// var fx_income = (data, x) => new Promise((res, rej)=>{
//     var time_stamp = moment().valueOf()
//     Promise.all((currency.coin.map(i=>{
//         return (data[x][i])
//     }))).then(data => {
//         data.unshift(time_stamp)
//         res(data)
//     });
// })
module.exports = {
    check_chart: (id, chart)=> new Promise((res,rej)=>{
        switch (chart) {
            case 'market':
                market_chart.findOne({id: id}, function(err, stats){
                    if(stats) {
                        res (true);
                    } else {
                        res (false);
                    }
                });
            break;
            case 'blockchain':
                blockchain_chart.findOne({id: id}, function(err, stats){
                    if(stats) {
                        res (true);
                    } else {
                        res (false);
                    }
                });
            break;
            case 'income':
                income_chart.findOne({id: id}, function(err, stats){
                    if(stats) {
                        res (true);
                    } else {
                        res (false);
                    }
                });
            break;
        }
        
    }),
    create_chart: (id, chart) => new Promise((res,rej)=>{
        switch (chart) {
            case 'market':
                var newchart = new market_chart({
                    id: id,
                });
                newchart.save(function(err){
                    if (!err) {
                        res ('Insert to Chart 24h database');
                    } else {
                        rej (err);
                    }
                });
            break;
            case 'blockchain':
                var newchart = new blockchain_chart({
                    id: id,
                });
                newchart.save(function(err){
                    if (!err) {
                        res ('Insert to Chart 24h database');
                    } else {
                        rej (err);
                    }
                });
            break;
            case 'income':
                var newchart = new income_chart({
                    id: id,
                });
                newchart.save(function(err){
                    if (!err) {
                        res ('Insert to Chart 24h database');
                    } else {
                        rej (err);
                    }
                });
            break;
        }
        
    }),
    push_to_market_chart: (id, data) => new Promise((res,rej)=>{
        Promise.all([
            fx_market(data, 'current_price'),
            fx_market(data, 'market_cap'),
            fx_market(data, 'total_volume')
        ]).then(([price, market_cap, total_volume])=>{
            market_chart.update(
                {id: id},
                {$push: {
                    price: price,
                    market_cap: market_cap,
                    total_volume: total_volume
                }}, function(){res ('Push done');}
            );
        })
    }),
    push_to_blockchain_chart: (id, data) => new Promise((res,rej)=>{
        var time_stamp = moment().valueOf()
        blockchain_chart.update(
            {id: id},
            {$push: {
                total_mn: [time_stamp, data.current_mn],
                difficulty: [time_stamp, data.difficulty],
            }}, function(){res ('Push done');}
        );
    }),
    push_to_income_chart: (id, data) => new Promise((res,rej)=>{
        var time_stamp = moment().valueOf()
        Promise.all([
            fx_income(data, 'daily_income'),
            fx_income(data, 'masternode_worth'),
        ]).then(([daily_income, masternode_worth])=>{
            income_chart.update(
                {id: id},
                {$push: {
                    roi: [time_stamp, data.roi],
                    daily_income: daily_income,
                    masternode_worth: masternode_worth
                }}, function(){res ('Push done');}
            );
        })
    }),
};