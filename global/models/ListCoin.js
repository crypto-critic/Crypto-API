const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GlobalConnection = require('../globalConnection');

const ListSchema = new Schema({
    coinId: { type: String, unique: true, index: true },
    name: { type: String},
    active: { type: Boolean, default: true },
    category: { type: String}
});

const List = GlobalConnection.model('lists', ListSchema);

module.exports = List;