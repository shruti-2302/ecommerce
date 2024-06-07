const mongoose = require("mongoose");

const { Schema } = mongoose;

let address = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  house: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  landmark: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
}, {
  collection: "address"
});

module.exports = mongoose.model("address", address);
