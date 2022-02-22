import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import {Post} from "./post.module";


@Injectable({providedIn:"root"})

export class PostService{

  private posts :Post[]=[];
  private postUpdate = new Subject<Post[]>();

  constructor(private http:HttpClient){}

  getPosts(){
    this.http.get<{message:string , posts:Post[]}>("http://localhost:3000/api/posts")

      .subscribe((res)=>{
          this.posts = res.posts;
          this.postUpdate.next([...this.posts]);
        })
  }

  getPostUpdatedListenr(){
    return this.postUpdate.asObservable();
  }

  addPost(title:string ,content:string){
    const post: Post = {_id:'',title:title,content:content,user:'hamza'};
    this.http.post<{message:string,postId:string}>("http://localhost:3000/api/post",post)
    .subscribe((res)=>{

      post._id = res.postId;
      this.posts.push(post);
      this.postUpdate.next([...this.posts]);
    })


  }


  //This for delete the selected post
  deletePost(postId:string){
    this.http.delete('http://localhost:3000/api/post/'+postId)
        .subscribe((res)=>{
          const updatedPost = this.posts.filter(post=> post._id!==postId);
          this.posts = updatedPost;
          this.postUpdate.next([...this.posts]);
        });
  }

}
