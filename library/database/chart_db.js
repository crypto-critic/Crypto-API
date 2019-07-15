var market_chart = require('../../models/chart/market_chart');
var blockchain_chart = require('../../models/chart/blockchain_chart');
var income_chart = require('../../models/chart/income_chart');
var moment = require('moment');

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
        var time_stamp = moment().valueOf()
        market_chart.update(
            {id: id},
            {$push: {
                price: [time_stamp, data.market_data.current_price.usd],
                market_cap: [time_stamp, data.market_data.market_cap.usd],
                total_volume: [time_stamp, data.market_data.total_volume.usd],
            }}, function(){res ('Push done');}
        );
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
        income_chart.update(
            {id: id},
            {$push: {
                roi: [time_stamp, data.roi],
                daily_income: [time_stamp, data.daily_income.usd],
                masternode_worth: [time_stamp, data.masternode_worth.usd]
            }}, function(){res ('Push done');}
        );
    }),
};