var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var money = require('./money_style');
var locale = require ('./locale_style');
var income_data_style = require('./income_data_style');
var market_data_style = require('./market_data_style');
var blockchain_data_style = require('./blockchain_data_style');
var CoinSchema = new Schema({
  id: { type: String, unique: true, index: true },
  name: { type: String, default: '' },
  localization:  locale,
  category: { type: String, default: ''},
  about: locale,
  active: { type: Boolean, default: true },
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
  genesis_date: {type: Date, default: null},
  blockchain_data: blockchain_data_style,
  market_data: market_data_style,
  income_data: income_data_style,
  community_data: {
    facebook_likes: { type: Number, default: 0 },
    twitter_followers: { type: Number, default: 0 },
    reddit_average_posts_48h: { type: Number, default: 0 },
    reddit_average_comments_48h: { type: Number, default: 0 },
    reddit_subscribers: { type: Number, default: 0 },
    reddit_accounts_active_48h: { type: Number, default: 0 },
    telegram_channel_user_count: { type: Number, default: 0 },
  },
  developer_data: {
    forks: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
    subscribers: { type: Number, default: 0 },
    total_issues: { type: Number, default: 0 },
    closed_issues: { type: Number, default: 0 },
    pull_requests_merged: { type: Number, default: 0 },
    pull_request_contributors: { type: Number, default: 0 },
    commit_count_4_weeks: { type: Number, default: 0 },
  },
  last_updated: Date
}, {id: false});

module.exports = mongoose.model('coin', CoinSchema);
