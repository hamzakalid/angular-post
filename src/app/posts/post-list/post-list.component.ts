import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.module';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  title = "Posts";

  posts = new Array();

  isLoading = false;
  length = '';
  pageSize =10;
  currentPage = 1;
  pageSizeOptions = [5,10,20,30,50,100];

  constructor(public postService: PostService ) { }

  onPageChange(dataPage: PageEvent){
    this.isLoading =true;
    this.currentPage = dataPage.pageIndex+1;
    this.pageSize = dataPage.pageSize;
    this.postService.getPosts(this.pageSize,this.currentPage);
    this.isLoading =false;
  }


  ngOnInit(): void {
    this.isLoading =true;
    this.postService.getPosts(this.pageSize,this.currentPage);

    this.postService.getPostUpdatedListenr().
      subscribe((result)=>{
        this.posts = result.post;
        this.length = result.count;
        this.isLoading=false;
      })
  }

  onDeleted(postId : string){
    this.postService.deletePost(postId);

  }
  ngOnDestroy(): void {
  }
}
