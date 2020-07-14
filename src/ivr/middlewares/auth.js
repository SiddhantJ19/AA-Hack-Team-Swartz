const {ErrorHandler} = require('../../error');

const authPin = (pin) => {
    x = false;
    if(x){
        return true;
    }else{
        throw new ErrorHandler(403, "This is an incorrect pin. Please try again later")
    }
}

exports.authenticate = (req, res, next) => {
  const pin = req.body.Digits;
  try {
      authPin(pin);
      next();
  } catch (error) {
      next(error);
  }
}