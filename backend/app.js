//define the express
const express = require('express');
//define the body-parser
/**-----------------------------------------------------------------------------
 * Body-parser is the Node.js body parsing middleware.It is responsible
 * for parsing the incoming request bodies in a middleware before you handle it.
 -------------------------------------------------------------------------------*/
const bodyParser = require("body-parser")

console.log("Somthing");
//define the mongoose

const mongoose = require("mongoose");

//define the post router
const postRouter = require('./router/posts');
const userRouter = require('./router/users');

const app = express();

//Connect to the mango database

mongoose.connect("mongodb+srv://hamzakhaled:xTuenKxHuxK7S6q@cluster0.rrhas.mongodb.net/angularPost?")
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
    "Origin, X-Requested-With, Content-Type, Accept ,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  // res.setHeader("multipart/form-data")
  next();
});


app.use('/api/posts',postRouter);
app.use('/api/auth',userRouter);

module.exports =app;
