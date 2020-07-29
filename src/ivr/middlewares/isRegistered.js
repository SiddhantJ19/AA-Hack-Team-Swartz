const {ErrorHandler} = require('../../error');
const {userModel} = require('../../aaService/models/user')

const checkNumber = async (num) => {
  let phone = num;
  console.log(phone);
  let user = await userModel.findOne({phone: phone});
  if (user === null) {
    throw new ErrorHandler(
        404,
        'This number is not registered with us. Contact your nearby bank branch');
  }
  return user;
};


exports.isNumberRegistered = async(req, res, next) => {
  try {
    // adding user prop, don't have to fetch again
    req.user = await checkNumber(req.body.From);
    next();
  } catch (error) {
    next(error);
  }
}