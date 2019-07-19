var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var ShareSchema = new Schema({
  id: { type: String, unique: true, index: true },
  active: { type: Boolean, default: true },
  basedata: {
    logo: { type: String, default: '' },
    name: { type: String, default: '' },
    website: { type: String, default: '' },
    ann: { type: String, default: '' },
    discord: { type: String, default: '' },
    twitter: { type: String, default: '' },
    telegram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  coinsupport: [{
    coin_id: { type: String},
    process: {type: Number, default: 1 },
    instant: {type: Boolean, default: false},
    totalmn: {type: Number, default: 0},
    fee: {type: Number, default: 0.02 },
    payout: { type: String, default: '' },
    withdraw: { type: String, default: '' }
  }]
});
module.exports = mongoose.model('share', ShareSchema);
