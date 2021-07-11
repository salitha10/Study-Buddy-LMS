const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  profile_picture: {
    type: String,
    unique: true
  },
  account_type: {
    type: String,
    required: true
  },
  login_count: {
    type: Number,
    default: 0
  },
  last_login: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

//Export schema
module.exports = mongoose.model('User', UserSchema);