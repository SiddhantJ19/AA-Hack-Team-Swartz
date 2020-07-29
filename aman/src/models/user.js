const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  aaId: {type: String, required: true, unique: true},
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  inBuffer: {type: Boolean, default: false}, // true after first phase of registeration
  isRegistered: {type: Boolean, default: false}, // true after otp validation
  pin: {type: String},
});

const userModel = mongoose.model('User', userSchema);

module.exports = {userModel};