const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(api);
app.use( '/favicon',express.static('favicon'))

app.listen('9002', function () {
    console.log("--- node express run in port 9002 ---");
})
