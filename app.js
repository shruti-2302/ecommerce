const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB');
const dotenv = require('dotenv');
const signup=require('./view/signup.route');
const address=require('./view/address.route');
const card=require('./view/card.route');
const productimage=require('./view/productimage.route');
const cloudinary=require('cloudinary').v2;
const otp=require('./view/otp.route');



dotenv.config();
const app = express();
const port = process.env.PORT || 2309;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
});


// Middleware
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',signup);
app.use('/',address);
app.use('/',card);
app.use('/',productimage);
 app.use('/',otp);


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database is connected ');
}).catch((err) => {
  console.error('Cannot connect to the database ' + err);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;