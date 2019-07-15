var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChartSchema = new Schema({
  id: { type: String, unique: true, index: true },
  total_mn: Array,
  difficulty: Array,
});
module.exports = mongoose.model('blockchain_chart', ChartSchema)
