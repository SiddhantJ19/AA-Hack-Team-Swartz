const {ErrorHandler} = require('../../error');

// TODO: call to server; must be async
checkNumber = (num) => {
    x = true;
    if(x){
        return "Verified";
    }else{
        throw new ErrorHandler(404, "This number is not registered with us. Sorry.")
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