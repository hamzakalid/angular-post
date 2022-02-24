const { count } = require('console');
const express = require('express');

const multer  = require('multer');

const post = require('../models/post');


const router = express.Router();


  // const MIME_TYPE_MAP = {
  //   'image/png' : 'png',
  //   'image/jpg' : 'jpg',
  //   'image/jpeg': 'jpg',
  // };

// const storage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     cb(null, 'backend/images/')
//   },

//   filename: function (req, file, cb) {

//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, file.fieldname + '-' + uniqueSuffix+"."+ext)

//   }


// })

// const upload = multer({ storage: storage,limits : {fileSize : 1000000}});


//Functions
// -----------------------------------------------------------
const upload = multer({ dest: './public/uploads/' })

//Type Get
//his middeleware for featch all posts
router.get("",(req,res,next)=>{

  //pagtions
  const pageSize  = req.query.pagesize;
  const currentPage  = req.query.page;

  const postQuery = post.find();
  //store the count of the posts
  let postlength ;
    post.count({}, function( err, count){
      postlength =  count;
    })


  if(pageSize && currentPage){
    postQuery.skip(pageSize * (currentPage-1)).limit(pageSize)
  }

  postQuery.then((docs) => {

    return res.status(200).json({
      msg: "post feached successfuly",
      count: ""+postlength,
      posts: docs,
    })

  })

})

//Type Post
//This middeleware for add new post
router.post('', upload.single('image'),(req,res,next)=>{


  console.log(req)

  if (!req.image) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }

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

//Type Delete
//This middeleware for delete the selected post
router.delete('/:id',(req,res,next)=>{
  count = Post.count();
  Post.deleteOne({_id: req.params.id}).then((result)=>{

    res.status(200).json({
      message : "post deleted!",
      count: count
    })

  })

})


//Type Put
//This middeleware for update the selected post
router.put('/:id',(req,res,next)=>{

  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    user: req.body.user,
  })

  Post.updateOne({_id: req.params.id},post).then((result)=>{

    res.status(200).json({
      message : "post Updated!"
    })

  })

})


module.exports = router;
