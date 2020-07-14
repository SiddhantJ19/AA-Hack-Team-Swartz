const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.welcome = () => {
  const response = new VoiceResponse();
  const gather = response.gather({
    action: '/ivr/menu',
    numDigits: '4',
    method: 'POST',
  });
  gather.say(
      'Welcome to the Account Aggregator Service. Please, enter your 4 digit pin to authenticate',
      {loop: 1});
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
      'Press 1 to use your checkpoint number' +
          'Press 2 to review your pending consent requests' +
          'Press 3 to review previous consents given' +
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