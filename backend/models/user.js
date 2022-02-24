const mongoose = require("mongoose")

//Create and schema [the Structure]
const userSchema = mongoose.Schema({
  username : {
    type : String,
    required: true,
  },
  email : {
    type :String,
    required : true
  },
  password : {
    type :String,
    default : "default.jpg"
  }
})

//Make this schema valid for other files
module.exports = mongoose.model('User',userSchema);
