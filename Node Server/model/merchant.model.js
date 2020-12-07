const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  firstname: {
    type : String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  shopname:{
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
  },
  mobilenumber: {
    type: Number,
  },
  address1: {
    type: String,
    trim: true
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  pincode: {
    type: Number
  }
});

const merchant = mongoose.model('merchant', merchantSchema);

module.exports = { merchant };
