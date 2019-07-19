const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GlobalConnection = require('../globalConnection');
const locale = require ('./locale_style');
const ListSchema = new Schema({
    coinId: { type: String, unique: true, index: true},
    name: { type: String, require: true},
    port: { type: String, require: true},
    active: { type: Boolean, default: true},
    genesis_date: {type: Date, default: null},
    localization:  locale,
    category: { type: String, default: 'masternode'},
    about: locale,
    links: {
        homepage: { type: Array, default: null },
        annoucement: { type: Array, default: null },
        discord: { type: Array, default: null },
        twitter: { type: Array, default: null },
        telegram: { type: Array, default: null },
        facebook: { type: Array, default: null },
        youtube: { type: Array, default: null },
        explorer: { type: Array, default: null },
        github: { type: Array, default: null },
        reddit:{ type: Array, default: null }
    },
    wallet: Object
});

const List = GlobalConnection.model('lists', ListSchema);

module.exports = List;