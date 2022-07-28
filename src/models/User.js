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

userSchema.statics.findById = async function findById(id) {
  const user = await this.findOne({ id });

  return user;
};

module.exports = mongoose.model('User', userSchema);
