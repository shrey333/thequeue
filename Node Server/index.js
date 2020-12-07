const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./database.js');
let userController = require('./controller/user.controller');
let merchantController = require('./controller/merchant.controller');
let queueController = require('./controller/queue.controller');

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/users', userController);
app.use('/merchants', merchantController);
app.use('/queue', queueController);
