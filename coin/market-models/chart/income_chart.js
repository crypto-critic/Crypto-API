var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChartSchema = new Schema({
  id: { type: String, unique: true, index: true },
  roi: Array,
  daily_income: Array,
  masternode_worth: Array
});
module.exports = mongoose.model('income_chart', ChartSchema)
