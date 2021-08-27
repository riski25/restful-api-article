var express = require('express');
var app = express();
var db = require('./db');
const cors = require("cors");
global.__root   = __dirname + '/';

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var ArtikelController = require(__root + 'artikel/ArtikelController');
app.use('/api/article', ArtikelController);

module.exports = app;