import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';



import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent implements OnInit {

  sinupForm = new FormGroup({
    username:new FormControl('',{
      validators:[
        Validators.required,
      ]
    }),
    email:new FormControl('',{
      validators:[
        Validators.required,
        Validators.email,
      ]
    }),
    password:new FormControl('',{
      validators:[
        Validators.required,
      ]
    }),

  }) ;

  constructor(public authService :AuthService) { }

  ngOnInit(): void {
  }

  onSubmit( ){
    if(this.sinupForm.valid){
      this.authService.creatUser(this.sinupForm.value.username,
        this.sinupForm.value.email,
        this.sinupForm.value.password);
    }

  }
}
