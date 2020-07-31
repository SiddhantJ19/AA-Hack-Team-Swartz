const Router = require('express').Router;
const {isNumberRegistered} = require('./middlewares/isRegistered');
const {authenticate} = require('./middlewares/auth');
const {welcome, twoFA,song, menu, pendingConsentHandler, computePendingHandler} = require('./handler');

const router = new Router();

router.post('/welcome', isNumberRegistered, (req, res) => {
  return res.send(welcome(req, res));
});

router.post('/2fa', async (req, res) => {
  let val = await twoFA(req, res);
  return res.send(val);
})

router.post('/menu', authenticate ,(req, res) => {
  return res.send(menu());
});

router.post('/demos', (req, res) => {
  const choice = req.body.Digits;
  if(choice == 1){
    // checkPointHandler();
  }
  else if(choice == 2){
    res.send(pendingConsentHandler());
  }
  else if(choice == 3){
    // previousConsentHandler();
  }
  else if (choice == 4){
    // revokeConsentHandler();
  }
  else{
    // unrecognizedDigitHandler();
  }
})


router.post('/computePending/:id', (req, res) => {
  console.log(req.params.id);
  if(req.params.id == '12') {
    res.send(computePendingHandler(req.body.Digits));
  }
  else{
    throw new Error(500, "Invlaid Consent Id");
  }
})  
router.post('/song',(req, res) => {
  const digit = req.body.Digits;
  return res.send(song(digit));
});


module.exports = router;
