const Router = require('express').Router;
const {welcome, twoFA,song, menu} = require('./handler');
const {isNumberRegistered} = require('./middlewares/isRegistered');
const {authenticate} = require('./middlewares/auth');

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

router.post('/song',(req, res) => {
  const digit = req.body.Digits;
  return res.send(song(digit));
});


module.exports = router;
