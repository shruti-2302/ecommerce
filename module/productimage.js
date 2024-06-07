const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Product model
let productSchema = new Schema({
    upload: [
        {
            client_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    description: { type: String, required: true },
    rating: { type: String, required: true },
    crating: { type: String, required: true },
    people: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    offer:{type:String,require:true}
}, {
    collection: 'productimage' // Name of the collection
});

module.exports = mongoose.model('productimage', productSchema); // Name of the model
