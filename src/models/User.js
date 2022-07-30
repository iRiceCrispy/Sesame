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

userSchema.methods.addBalance = async function addBalance(amount) {
  this.balance += amount;
  await this.save();
};

userSchema.methods.subtractBalance = async function subtractBalance(amount) {
  this.balance -= amount;
  await this.save();
};

userSchema.methods.transfer = async function transfer(target, amount) {
  await this.subtractBalance(amount);
  await target.addBalance(amount);
};

module.exports = mongoose.model('User', userSchema);
