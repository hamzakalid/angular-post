//define the express
const express = require('express');
//define the body-parser
/**-----------------------------------------------------------------------------
 * Body-parser is the Node.js body parsing middleware.It is responsible
 * for parsing the incoming request bodies in a middleware before you handle it.
 -------------------------------------------------------------------------------*/
const bodyParser = require("body-parser")

//define the mongoose

const mongoose = require("mongoose");

//define the post model

const Post = require('./models/post');

const app = express();

//Connect to the mango database

mongoose.connect("mongodb+srv://hamzakhaled:xTuenKxHuxK7S6q@cluster0.rrhas.mongodb.net/angularPost?retryWrites=true&w=majority")
        .then(()=>{
          console.log("the database is connected :)")
        }).catch(()=>{
          console.log("the connection is faild :(");
        })


// inital the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//This middeleware for fix the CORS Error
//This error comes becouse the server run one two defrentec servers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});



//Middeleware 1
//Type Get => to get all the posts with api
app.get("/api/posts",(req,res,next)=>{

  Post.find().then((docs) => {
    return res.status(200).json({
      msg: "post feached successfuly",
      posts: docs
    })
  })


})

//This middeleware for add new post

app.post('/api/post/',(req,res,next)=>{
  //post create [send the post to the serve]

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    user: "hamza"
  })
  //Save The Post . . .
  post.save().then((resulte)=>{

    res.status(201).json({
      message: "post added sucessfuly",
      postId : resulte._id
    });

  });



})

app.delete('/api/post/:id',(req,res,next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then((result)=>{
    res.status(200).json({
      message : "post deleted!"
    })
  })

})

module.exports =app;
