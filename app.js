const express = require('express');
require("./config/db.config");
const router = require('./routes');
const path = require('path');

const app = express();

app.use(express.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use ('/api', router);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());

module.exports = app;

