const VoiceResponse = require('twilio').twiml.VoiceResponse;

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
};

const handleError = (err) => {
  const {statusCode, message} = err;
  const response = new VoiceResponse();

  console.log(statusCode, message);

  if (statusCode < 500) {
    response.say(message);
  } else {
    response.say(
        'We are facing some error on our side. Please, try again later.');
  }

  response.hangup();
  return response.toString();
};

module.exports = {
  ErrorHandler,
  handleError
};