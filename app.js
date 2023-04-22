const express = require('express');
require("./config/db.config");
const router = require('./routes');
const userRoutes = require('./routes/user');
const userRoutes = require('./routes/Sauce');

const app = express();

app.use ('/api', router)
app.use('/api/auth, userRoutes')
app.use('/api/Sauce', sauceRoutes)

module.exports = app;

