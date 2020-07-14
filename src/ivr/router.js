const Router = require('express').Router;
const {welcome, song, menu} = require('./handler');
const {isNumberRegistered} = require('./middlewares/isRegistered');
const {authenticate} = require('./middlewares/auth');

const router = new Router();

router.post('/welcome', isNumberRegistered, (req, res) => {
  console.log(req.body.From);
  return res.send(welcome());
});

router.post('/menu', authenticate ,(req, res) => {
  return res.send(menu());
});

router.post('/song',(req, res) => {
  const digit = req.body.Digits;
  return res.send(song(digit));
});


module.exports = router;
