const mongoose = require("mongoose")

//Create and schema [the Structure]
const postSchema = mongoose.Schema({
  title : {
    type : String,
    required: true
  },
  content : {
    type :String,
    required : true
  },
  image : {
    type :String,
    default : "default.jpg"
  },
  user : {
    type :String,
    required : true
  }
})

//Make this schema valid for other files
module.exports = mongoose.model('Post',postSchema);
