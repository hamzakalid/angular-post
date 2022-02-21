import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

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
    const post: Post = {title:title,content:content,user:'hamza'};
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);

  }

}
