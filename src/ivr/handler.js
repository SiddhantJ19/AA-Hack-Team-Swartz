const VoiceResponse = require('twilio').twiml.VoiceResponse;
const {userModel} = require('../aaService/models/user');
const {mockControllerRegister} =
    require('../aaService/controller/mockController');

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
  await user.save();

  // await mockControllerRegister(user);

  const response = new VoiceResponse();
  response.say('You are now registered. Do not share your pin');
  return response.toString();
};

exports.menu = () => {
  const response = new VoiceResponse();
  const gather = response.gather({
    action: '/ivr/demos',
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

exports.checkPointHandler = () => {
  const response = new VoiceResponse();
  response.say('You pressed checkpoint');
  return response.toString();
}

exports.pendingConsentHandler = () => {
  const response = new VoiceResponse();
  const gather =  response.gather({
    action: '/ivr/computePending/12', // id of the pending Consent
    numDigits: '1',
    method: 'POST',
  });
  gather.say('HDFC bank wants to access your last 25 SBI bank transactions. Press 1 to approve or 2 to deny') // hardcoded dummy pending request
  return response.toString();
}

exports.computePendingHandler = (digit) => {
  const response = new VoiceResponse();
  if(digit == 1){
    response.say('Consent approved');
  }
  else{
    response.say('Consent Denied');
  }
  return response.toString();
}

exports.previousConsentHandler = () => {
  const response = new VoiceResponse();
  response.say('You pressed pre');
  return response.toString();
}

exports.revokeConsentHandler = () => {
  const response = new VoiceResponse();
  response.say('You pressed revoke');
  return response.toString();
}

exports.unrecognizedDigitHandler = () => {
  const response = new VoiceResponse();
  response.say('Invalid Choice; Try again later');
  return response.toString();
}
