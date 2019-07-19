var money = require('./money_style');
module.exports = {
    ROI: { type: Number, default: 0 },
    dailyIncome: Object.assign({coin: {type: Number, default: 0}}, money),
    weeklyIncome: Object.assign({coin: {type: Number, default: 0}}, money),
    monthlyIncome: Object.assign({coin: {type: Number, default: 0}}, money),
    yearlyIncome: Object.assign({coin: {type: Number, default: 0}}, money),
    masternodeWorth: Object.assign({coin: {type: Number, default: 0}}, money),
}