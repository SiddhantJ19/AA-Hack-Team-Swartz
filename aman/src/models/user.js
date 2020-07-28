const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  aaId: {type: String, required: true, unique: true},
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v)
      },
      message: props => `${props.value} is not a valid number`
    }
  },
  inBuffer: {type: Boolean, default: false}, // true after first phase of registeration
  isRegistered: {type: Boolean, default: false}, // true after otp validation
  pin: {type: String},
});

const userModel = mongoose.model('User', userSchema);

module.exports = {userModel};