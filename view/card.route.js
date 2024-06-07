const express = require('express');
const bodyParser= require('body-parser');
const cardcontroller= require('../controller/card');
const Router= express.Router();
const app = express();
//app.use(jwtmiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/card', cardcontroller.addCard);
Router.delete('/deletecard/:cardId',cardcontroller.deleteCard);
Router.get('/getcard',cardcontroller.getCardList);

module.exports=Router;