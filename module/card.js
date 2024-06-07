const mongoose = require("mongoose");

const {Schema}= mongoose;

let card = new Schema({
      cardType: {
          type: String,
         
      },
      cardHolderName: {
          type: String,
         
      },
      bankName:{
        type:String,
       
      },
      cardNumber: {
          type: String,
         
      },
      expiryMonth: {
          type: String,
          
      },
      expiryYear: {
          type: Number,
          
      },
      cvv: {
          type: Number,
        
      },
      otp: {
        type: [String],
        default: []
    }
},
{
    collection: "card"
});
module.exports= mongoose.model("card",card);