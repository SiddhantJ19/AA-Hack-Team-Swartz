const Router = require('express').Router;
const {welcome, song} = require('./handler');

const router = new Router();

router.post('/welcome', (req, res) => {
  return res.send(welcome());
});

router.post('/song', (req, res) => {
  const digit = req.body.Digits;
  return res.send(song(digit));
});

module.exports = router;
