const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommunitySchema = new Schema({
  coinId: { type: String, unique: true, index: true },
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
}, {id: false});

class Community {
  constructor(connection){
      this.model = connection.model('Community', CommunitySchema, 'communitys')
  }
}

module.exports = Community;