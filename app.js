const express = require('express');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./src/router');
const {handleError} = require('./src/error');

const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(cookie_parser());

app.use(router);

// error middleware
app.use((error, req, res, next) => {
  res.send(handleError(error));
});

module.exports = app;