//define the express
const express = require('express');
//define the body-parser
/**-----------------------------------------------------------------------------
 * Body-parser is the Node.js body parsing middleware.It is responsible
 * for parsing the incoming request bodies in a middleware before you handle it.
 -------------------------------------------------------------------------------*/

const bodyParser = require("body-parser")

const app = express();

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

//This middeleware for add new post

app.post('/api/post/',(req,res,next)=>{
  //post create
  console.log(req.body);

  res.status(201).json({
    message: "post added sucessfuly"
  })
})


module.exports =app;
