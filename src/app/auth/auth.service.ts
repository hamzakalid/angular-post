
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "./auth.module";

@Injectable({providedIn:"root"})

export class AuthService{

  private authStatusListener = new Subject<boolean>();
  private token!: string;
  //The class constructor
  constructor(private http:HttpClient,private router:Router){}

  private isAuthenticated= false;
  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  private  API_LINK = "http://localhost:3000/api/auth";

  creatUser(username:string,email:string,password:string){

    const user : User = {
      username:username,
      email:email,
      password:password,
    }

    this.http.post(this.API_LINK+'/sinup',user)
    .subscribe(res=>{
      this.router.navigateByUrl('/log-in');
    });

  }


  login(email:string,password:string){
    this.http.post<{token:string}>(this.API_LINK+"/login",{email:email,password:password})
    .subscribe(result => {

      this.token = result.token;
      if(result.token){
        this.isAuthenticated = true;
        this.authStatusListener.next(true)
        this.router.navigate(['/'])
      }
    })
  }

  logout(){
    this.isAuthenticated = false;
    this.token = '';
    this.authStatusListener.next(false);
    this.router.navigate(['/'])
  }
}
