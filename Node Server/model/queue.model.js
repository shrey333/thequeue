const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  userid: {
    type: String
  },
  merchantid: {
    type: String
  },
  shopname: {
    type: String
  },
  merchantname: {
    type: String
  },
  merchantphone: {
    type: String
  },
  username: {
    type: String
  },
  userphone: {
    type: String
  }
});

const queue = mongoose.model('queue', queueSchema);

module.exports = { queue }
