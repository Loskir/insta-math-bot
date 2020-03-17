const mongoose = require('mongoose')

const users = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true,
    index: true
  },

  username: String,
  first_name: String,
  last_name: String,
  language_code: String,

  is_subscribed: {
    type: Boolean,
    default: true
  },
  is_blocked: {
    type: Boolean,
    default: false
  },

  lang: String,

  english_level: String,

  last_activity_at: Date,
  created_at: Date,
  updated_at: Date,
})
users.pre('save', function (next) {
  if (this.created_at == null) {
    this.created_at = new Date()
  }
  this.updated_at = new Date()
  return next()
})

module.exports = mongoose.model('users', users)
