import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.module';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  constructor(public postService: PostService ) { }
  title = "Posts";

  posts = new Array();



  ngOnInit(): void {
     this.postService.getPosts();
    this.postService.getPostUpdatedListenr().
      subscribe((posts : Post[])=>{
        this.posts = posts;
      })
  }

  ngOnDestroy(): void {
  }
}
