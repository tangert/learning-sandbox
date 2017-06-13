var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
  handle: String,
  content: String,
  image: String,
  sentiment: Number,
  timeCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tweet', TweetSchema);
