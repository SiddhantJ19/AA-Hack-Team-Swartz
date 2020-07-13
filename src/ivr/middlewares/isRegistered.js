const {ErrorHandler} = require('../../error');

// call to server; must be async
checkNumber = (num) => {
    x = false;
    if(x){
        return "Verified";
    }else{
        throw new ErrorHandler(400, "This number is not registered with us. Sorry.")
    }
}


exports.isNumberRegistered = (req, res, next) => {
  console.log(req);
  try {
    checkNumber(req.body.From);
    next();
  } catch (error) {
    next(error);
  }
}