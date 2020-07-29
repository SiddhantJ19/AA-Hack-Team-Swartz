const {ErrorHandler} = require('../../error');
const {userModel} = require('../../aaService/models/user');

const authPin = async (pin, phone) => {
  const user = await userModel.findOne({phone: phone});
  console.log(pin, user.pin);
  if (user.pin != pin) {
    throw new ErrorHandler(
        403, 'This is an incorrect pin. Please try again later')
  };
  return user;
};

exports.authenticate = async (req, res, next) => {
  const pin = req.body.Digits;
  const phone = req.body.From;
  try {
    req.user = await authPin(pin, phone);
    next();
  } catch (error) {
    next(error);
  }
}