var express = require('express');

var bodyParser = require('body-parser');
var router = require('./index.js');

const app = express();

const PORT = 5431;

app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log("server is started")
});
