import { Component } from '@angular/core';

import {Post} from "./posts/post.module"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  storedPost  = new Array();

  //lisent to the event
  onPost(post:any){
    this.storedPost.push(post);
    console.log(this.storedPost  )
  }

}
