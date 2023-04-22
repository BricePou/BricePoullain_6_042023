const express = require('experss');
const router = express.Router();
const userCtrl = require('./controllers/user')

route.post('/auth/signup', userCtrl.signup)
route.post('/auth/login', userCtrl.login)

module.export = router