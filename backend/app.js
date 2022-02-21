const express = require('express');


const app = express();

//This middeleware for fix the CORS Error
//This error comes becouse the server run one two defrentec servers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});



//Middeleware 1
app.get("/api/posts",(req,res,next)=>{
  posts = [{
    title:"the first post",
    content:"this post comming from the backend",
    user: "ali",
  },{
    title:"the secund post",
    content:"this post comming from the backend!",
    user: "saeed",
  },{
    title:"the secund post",
    content:"this post comming from the backend!",
    user: "saeed",
  }]

  return res.status(200).json({
    msg: "post feached successfuly",
    posts: posts
  })
})

//Middeleware 2
app.use((req,res,next)=>{
  res.send("secound  middeleware")
  next();
})


module.exports =app;
