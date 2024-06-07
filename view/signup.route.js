const express = require ("express");
const Router = express.Router();
const bodyParser = require('body-parser');
const signupcontroler= require('../controller/signup');
const app = express();


// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//signup api
app.use('/signup',Router);

Router.post('/signup',signupcontroler.signup);
Router.post('/login',signupcontroler.login);

 Router.put('/forgetpassword/:userId',signupcontroler.forgotpassword);
Router.get('/getuser',signupcontroler.getuser);
Router.delete('/deleteuser/:userId',signupcontroler.deleteuser);
module.exports = Router;
