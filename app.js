const express = require('express');
require("./config/db.config");
const router = require('./routes');

const app = express();

app.use ('/api', router)

module.exports = app;

