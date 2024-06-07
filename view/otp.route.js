// otp.route.js
const express = require("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const otpcontroler= require('../controller/otp');
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// OTP generation API

Router.post('/otp', otpcontroler.otp);
// Router.get('/getotp',otpcontroler.getotp);

module.exports = Router;
