var express = require('express');
var router = express.Router();
var { registerFromBankController, loginController } =
    require('./controller/loginController')
var { mockControllerRegister, mockControllerLogin } =
    require('./controller/mockController')


router.post('/login', function (req, res) {
    loginController(req, res)
});

router.post('/registerFromBank', function (req, res) {
    registerFromBankController(req, res);
});


router.post('/register', function (req, res) {
    mockControllerRegister(req, res)
});

router.post('/aaLogin', function (req, res) {
    mockControllerLogin(req, res)
});

module.exports = router;
