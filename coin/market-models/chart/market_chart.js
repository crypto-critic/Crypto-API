var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChartSchema = new Schema({
  id: { type: String, unique: true, index: true },
  price: Array,
  market_cap: Array,
  total_volume: Array
});
module.exports = mongoose.model('market_chart', ChartSchema)