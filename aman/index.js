var express = require('express');
var router = express.Router();
var {registerFromBankController, registerFromIVRController, loginController} =
    require('./src/controller/loginController')
var {mockControllerRegister, mockControllerLogin} =
    require('./src/controller/mockController')


router.get('/ping', function(req, res) {
  res.send('ping successful')
});

router.post('/login', function(req, res) {
  loginController(req, res)
});

router.post('/registerFromBank', function(req, res) {
    registerFromBankController(req, res);
});

router.post('/register', function (req, res) {
    mockControllerRegister(req, res)
});
router.post('/aaLogin', function (req, res) {
    mockControllerLogin(req, res)
});

module.exports = router;
