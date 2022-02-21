import { Component, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Post} from "../post.module"
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent  {

  title = 'Create Post';


  postTitle ="";
  postContent = "";

  constructor(public postService: PostService ,private _snackBar: MatSnackBar) { }


  onPost(postForm : NgForm){
    if (postForm.invalid) {
      this._snackBar.open( "the Title and the content is required" , "done");
      return;
    }


     const post:Post = {
      title : postForm.value.title,
      content:postForm.value.content,
      user: "hamza",
    };
    this.postService.addPost(post.title,post.content)

    this._snackBar.open( "Posted", "done");

    postForm.resetForm();

  }
}
