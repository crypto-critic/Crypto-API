var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var money = require('./money_style');
var income_data_style = require('./income_data_style');
var market_data_style = require('./market_data_style');
var blockchain_data_style = require('./blockchain_data_style');
var MarketSchema = new Schema({
  coinId: { type: String, unique: true, index: true },
  market_data: market_data_style,
  income_data: income_data_style,
  last_updated: {type: Number},
}, {id: false});

class Market {
  constructor(connection){
      this.model = connection.model('Market', MarketSchema, 'markets')
  }
}

module.exports = Market;
