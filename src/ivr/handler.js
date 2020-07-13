const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.welcome = () => {
  const response = new VoiceResponse();
  const gather = response.gather({
    action: '/ivr/song',
    numDigits: '1',
    method: 'POST',
  });
  gather.say('Press any key to listen to a new song', {loop: 3});
  return response.toString();
};


exports.song = (digit) => {
  if (digit) {
    const response = new VoiceResponse();
      response.say('You pressed'+ digit.toString());
    return response.toString();
  };
}