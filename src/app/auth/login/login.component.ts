import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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


  constructor() { }




  ngOnInit(): void {
  }


  onSubmit(){
    console.log(this.loginForm);

  }

}
