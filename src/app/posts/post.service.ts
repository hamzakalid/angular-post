import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import {Post} from "./post.module";


@Injectable({providedIn:"root"})

export class PostService{

  private posts :Post[]=[];
  private postUpdate = new Subject<{post:Post[],count:string}>();

  //



  constructor(private http:HttpClient,private router:Router){}

  getPosts(pageSize:number,currentPage:number){
    const query =`?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{msg:string ,count:string ,posts:Post[]}>("http://localhost:3000/api/posts"+query)
      .subscribe((res)=>{

          console.log(res)
          this.posts = res.posts;
          this.postUpdate.next({post: [...this.posts],count:""+res.count});

        })
  }


  getPost(id:string){

    return {...this.posts.find(p=> p._id ==id)};

  }
  getPostUpdatedListenr(){
    return this.postUpdate.asObservable();
  }




  addPost(title:string ,content:string,post:FormData){



    this.http.post<{message:string,postId:string}>("http://localhost:3000/api/posts",post)
    .subscribe((res)=>{
      // const post: Post = {_id:res.post._id,title:res.post.title,res.post.content:content,user:res.post.user};
      // this.posts.push(post);
      // this.postUpdate.next([...this.posts]);
      this.router.navigateByUrl('/');

    })


  }


  //This for delete the selected post
  deletePost(postId:string){
    this.http.delete<{message:string,count:string}>('http://localhost:3000/api/posts/'+postId)
        .subscribe((res)=>{
          const updatedPost = this.posts.filter(post=> post._id!==postId);
          this.posts = updatedPost;
          this.postUpdate.next({post:[...this.posts],count:res.count});
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
