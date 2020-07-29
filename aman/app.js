var express = require('express');

var bodyParser = require('body-parser');
var router = require('./index.js');
var mongoose = require('mongoose');
const MONGO_URI = "mongodb://localhost:27017/AA-hack"
    // 'mongodb+srv://siddhant-user-1:%40siddhant-user-1@cluster0.3lkhs.mongodb.net/AA-hack?retryWrites=true&w=majority'
const app = express();

const PORT = 5431;

app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, () => {
  mongoose.connect(MONGO_URI, {useNewUrlParser: true})
      .then(() => console.log('Connected To Db'))
      .catch(error => console.error(error));
  console.log('server is started')
});
