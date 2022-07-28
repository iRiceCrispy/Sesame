const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 1000,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('User', userSchema);
