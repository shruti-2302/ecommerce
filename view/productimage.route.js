const express = require('express');
const bodyParser = require('body-parser');
const productcontroller = require('../controller/productimage');
const Router = express.Router();
const app = express();
const upload= require('../middleware/upload');
const jwtmiddleware=require('../middleware/jwtmiddlewate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/addproduct',jwtmiddleware,upload, productcontroller.productCreate);
Router.delete('/deleteproduct/:productId', jwtmiddleware,productcontroller.deleteProduct);
Router.put('/updateproduct/:productId',jwtmiddleware, upload,productcontroller.updateProductImage); // Corrected function name
Router.get('/getproduct',productcontroller.getAllProducts);
Router.get('/getoneproduct/:productId',productcontroller.getProduct);
module.exports = Router;
