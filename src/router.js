const Router = require('express').Router
const twillio = require('twilio');
const ivrRouter = require('./ivr/router');
const aaRouter = require('./aaService/router');
const router = new Router();

router.get('/', (req, res) => {
  res.send('Base Route');
});

router.use('/api', aaRouter);
router.use('/ivr', twillio.webhook({ validate: false }), ivrRouter);

module.exports = router;