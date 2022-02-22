const express = require('express');

const Post = require('../models/post');

const router = express.Router();


//Functions
// -----------------------------------------------------------

//Type Get
//his middeleware for featch all posts
router.get("",(req,res,next)=>{

  Post.find().then((docs) => {

    return res.status(200).json({
      msg: "post feached successfuly",
      posts: docs
    })

  })

})

//Type Post
//This middeleware for add new post
router.post('',(req,res,next)=>{

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

  Post.deleteOne({_id: req.params.id}).then((result)=>{

    res.status(200).json({
      message : "post deleted!"
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
