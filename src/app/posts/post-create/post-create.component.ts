import { Component, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {Post} from "../post.module"
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  title = 'Create Post';

  isLoading = false;
  postTitle ="";
  postContent = "";

  //edit OR create
  private mode = 'create';
  private postId = '';
  public post:Post = {
    _id : '',
    title : '',
    content : '',
    user : '',
  };


  //Post Service is class I made to transfer the data between the component
  //Activated Route is class I used to get the router I current use [create OR edit]
  //MatSnackBar is class I used to show component called snackBar


  constructor(public postService: PostService, public router: ActivatedRoute ,private _snackBar: MatSnackBar) { }

  //Function start when this component start
  ngOnInit(): void {
    this.isLoading = true;
      this.router.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has("postId")){
          //If the Router was edit router
          this.mode = 'edit';
          this.postId = ""+paramMap.get('postId');

          let oldpost = this.postService.getPost(this.postId);

          this.post = {
            _id : ""+oldpost._id,
            title : ""+oldpost.title,
            content : ""+oldpost.content,
            user : ""+oldpost.user,
          }


        }else{
          //If the Router was create router
          this.mode = 'create'
          this.postId ='';
        }
      this.isLoading = false;

      })
  }



  onPost(postForm : NgForm){
    if (postForm.invalid) {
      this._snackBar.open( "the Title and the content is required" , "done");
      return;
    }

    if(this.mode == 'create'){
       const post:Post = {
        _id:'',
        title : postForm.value.title,
        content:postForm.value.content,
        user: "hamza",
      };
      this.postService.addPost(post.title,post.content)

      this._snackBar.open( "Posted", "done");

      postForm.resetForm();
    }else{
      const post:Post = {
        _id:'',
        title : postForm.value.title,
        content:postForm.value.content,
        user: "hamza",
      };
      this.postService.updatePost(this.post._id,post.title,post.content,post.user)

      this._snackBar.open( "Posted", "done");

      postForm.resetForm();
    }


  }
}
