import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //Login form
  loginForm = new FormGroup({

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


  constructor(public authService:AuthService) { }


  ngOnInit(): void {
  }


  onSubmit(){

    this.authService.login(this.loginForm.value.email,this.loginForm.value.password)

  }

}
