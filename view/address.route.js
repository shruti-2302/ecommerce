const express = require('express');
const bodyParser= require('body-parser');
const addresscontroller= require('../controller/address');
const Router= express.Router();
const app = express();
//app.use(jwtmiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/address', addresscontroller.addresscreate);
Router.delete('/deleteaddress/:addressId',addresscontroller.deleteaddress);
Router.put('/updateaddress/:addressId',addresscontroller.updateaddress);
Router.get('/getaddress',addresscontroller.getAddressList);
module.exports=Router;