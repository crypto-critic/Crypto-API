var money = require('./money_style');
module.exports = {
    roi: { type: Number, default: 0 },
    daily_income: Object.assign({coin: {type: Number, default: 0}}, money),
    weekly_income: Object.assign({coin: {type: Number, default: 0}}, money),
    monthly_income: Object.assign({coin: {type: Number, default: 0}}, money),
    yearly_income: Object.assign({coin: {type: Number, default: 0}}, money),
    masternode_worth: Object.assign({coin: {type: Number, default: 0}}, money),
}