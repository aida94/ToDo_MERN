const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema 
const UserSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    username: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String,
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false
    // },
    // register_date: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  google: {
    id: {
      type: String
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false
    // },
    // register_date: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  facebook: {
    id: {
      type: String
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false
    // },
    // register_date: {
    //   type: Date,
    //   default: Date.now
    // }
  }
});


// create User model and export it
module.exports = User = mongoose.model('user', UserSchema);