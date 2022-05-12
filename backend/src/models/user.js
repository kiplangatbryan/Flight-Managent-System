const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
     title: {
      type: String,
      required: true
    },
    fisrtName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    } ,
    email: {
      type: String,
      required: true
    } , 
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    }
  },
  { timestap: true }
);

module.exports = mongoose.model("user", userSchema);
