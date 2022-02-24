import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }
}
