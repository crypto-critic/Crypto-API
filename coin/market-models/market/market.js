const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var MarketSchema = new Schema({
  coinId: { type: String, unique: true, index: true },
  market_data: Object,
  income_data: Object,
  last_updated: {type: Number},
}, {id: false});

class Market {
  constructor(connection){
      this.model = connection.model('Market', MarketSchema, 'markets')
  }
}

module.exports = Market;
