const VoiceResponse = require('twilio').twiml.VoiceResponse;
const {userModel} = require('../aaService/models/user');

exports.welcome = (req, res) => {
  const response = new VoiceResponse();
  // if user is not registered yet but has completed fromBank reg
  if (req.user.inBuffer) {
    const gather = response.gather({
      action: '/ivr/2fa',
      numDigits: '4',
      method: 'POST',
    });
    gather.say(
        'Welcome to Account Aggregator. Please, enter 4 digits to set your pin')
    return response.toString();
  } else {
    const gather = response.gather({
      action: '/ivr/menu',
      numDigits: '4',
      method: 'POST',
    });
    gather.say(
        'Welcome to the Account Aggregator Service. Please, enter your 4 digit pin to authenticate',
        {loop: 1});
    return response.toString();
  }
};

exports.twoFA = async (req, res) => {
  const pin = req.body.Digits;
  const phone = req.body.From;
  const user = await userModel.findOne({phone: phone});

  user.pin = pin;
  user.isRegistered = true;
  user.inBuffer = false;
  await user.save()
  const response = new VoiceResponse();
  response.say('You are now registered. Do not share your pin');
  return response.toString();
};

exports.menu = () => {
  const response = new VoiceResponse();
  const gather = response.gather({
    action: '/ivr/song',
    numDigits: '1',
    method: 'POST',
  });
  gather.say(
      'Press 1 to use your checkpoint number, ' +
          'Press 2 to review your pending consent requests, ' +
          'Press 3 to review previous consents given, ' +
          'Press 4 to revoke consents',
      {loop: 3});
  return response.toString();
};

exports.song = (digit) => {
  if (digit) {
    const response = new VoiceResponse();
    response.say('You pressed' + digit.toString());
    return response.toString();
  };
}