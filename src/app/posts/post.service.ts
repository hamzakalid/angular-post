import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import {Post} from "./post.module";


@Injectable({providedIn:"root"})

export class PostService{

  private posts :Post[]=[];
  private postUpdate = new Subject<Post[]>();

  constructor(private http:HttpClient,private router:Router){}

  getPosts(){
    this.http.get<{message:string , posts:Post[]}>("http://localhost:3000/api/posts")
      .subscribe((res)=>{

          this.posts = res.posts;
          this.postUpdate.next([...this.posts]);

        })
  }


  getPost(id:string){

    return {...this.posts.find(p=> p._id ==id)};

  }
  getPostUpdatedListenr(){
    return this.postUpdate.asObservable();
  }




  addPost(title:string ,content:string){
    const post: Post = {_id:'',title:title,content:content,user:'hamza'};
    this.http.post<{message:string,postId:string}>("http://localhost:3000/api/posts",post)
    .subscribe((res)=>{

      post._id = res.postId;
      this.posts.push(post);
      this.postUpdate.next([...this.posts]);
      this.router.navigateByUrl('/');

    })


  }


  //This for delete the selected post
  deletePost(postId:string){
    this.http.delete('http://localhost:3000/api/posts/'+postId)
        .subscribe((res)=>{
          const updatedPost = this.posts.filter(post=> post._id!==postId);
          this.posts = updatedPost;
          this.postUpdate.next([...this.posts]);
        });
  }

  //This for update the selected post
  updatePost(postId:string,title:string ,content:string,user:string){
    const post = {_id:'',title:title,content:content,user:user};
    this.http.put('http://localhost:3000/api/posts/'+ postId,post)
    .subscribe((res)=>{
      this.router.navigateByUrl('/');
    })
  }

}
