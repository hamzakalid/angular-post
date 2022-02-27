import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

import {Post} from "./posts/post.module"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'App';
  storedPost  = new Array();

  constructor(private authService:AuthService){}

  private authListenerSub: Subscription=new Subscription();
  public userIsAutheticated =false;
  //lisent to the event
  onPost(post:any){
    this.storedPost.push(post);
    console.log(this.storedPost  )
  }


  ngOnInit(): void {
    this.authService.autoAuth();
    this.userIsAutheticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAutheticated =>{
      this.userIsAutheticated =isAutheticated;
    })
  }


  ngOnDestroy(): void {

  }


  onLogout(){
    this.userIsAutheticated = false;
    this.authService.logout();
  }
}
