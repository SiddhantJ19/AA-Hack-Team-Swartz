const Router = require('express').Router;
const {welcome, song} = require('./handler');
const {isNumberRegistered} = require('./middlewares/isRegistered');

const router = new Router();

router.post('/welcome', isNumberRegistered, (req, res) => {
  console.log(req.body.From);
  return res.send(welcome());
});

router.post('/song', (req, res) => {
  const digit = req.body.Digits;
  return res.send(song(digit));
});

module.exports = router;
