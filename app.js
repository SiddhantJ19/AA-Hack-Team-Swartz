const express = require('express');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const router = require('./src/router');

const app = express();
app.use(morgan('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(cookie_parser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

module.exports = app;