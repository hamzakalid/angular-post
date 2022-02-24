import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {Post} from "../post.module"
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  title = 'Create Post';

  //Define the form object
  form = new FormGroup({
    title:new FormControl(null,{
      validators:[
        Validators.required,
        Validators.minLength(10)
      ]
    }),
    content:new FormControl(null,{
      validators:[Validators.required]
    }),
    fileSource: new FormControl('', [Validators.required])

  }) ;

  isLoading = false;
  postTitle ="";
  postContent = "";
  imageSrc ="";
  //edit OR create
  private mode = 'create';
  private postId = '';
  public post:Post = {
    _id : '',
    title : '',
    content : '',
    user : '',
  };


  //Post Service is class I made to transfer the data between the component
  //Activated Route is class I used to get the router I current use [create OR edit]
  //MatSnackBar is class I used to show component called snackBar


  constructor(public postService: PostService, public router: ActivatedRoute ,private _snackBar: MatSnackBar) { }

  //Function start when this component start
  ngOnInit(): void {
    this.isLoading = true;
      this.router.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has("postId")){
          //If the Router was edit router
          this.mode = 'edit';
          this.postId = ""+paramMap.get('postId');

          let oldpost = this.postService.getPost(this.postId);

          this.post = {
            _id : ""+oldpost._id,
            title : ""+oldpost.title,
            content : ""+oldpost.content,
            user : ""+oldpost.user,
          }

          this.form.setValue({'title': this.post.title,'content':this.post.content});

        }else{
          //If the Router was create router
          this.mode = 'create'
          this.postId ='';
        }
      this.isLoading = false;

      })
  }



  onPost(){
    if (this.form.invalid) {
      this._snackBar.open( "the Title and the content is required" , "done");
      return;
    }

    if(this.mode == 'create'){

      const formData = new FormData;
      formData.append('title',this.form.get('title')?.value);
      formData.append('content',this.form.get('content')?.value );
      formData.append('file', this.form.get('fileSource')?.value);

      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image)

      this._snackBar.open( "Posted", "done");

      this.form.reset();


    }else{
      const post:Post = {
        _id:'',
        title : this.form.value.title,
        content:this.form.value.content,
        user: "hamza",
      };

      this.postService.updatePost(this.post._id,post.title,post.content,post.user)

      this._snackBar.open( "Posted", "done");

      this.form.reset();
    }
  }

  //This function for upload files [image]
  onImagePicked(event: any){
    //reader => to read the uploaded file
    const reader = new FileReader();
    //check if there is file or note
    if(event.target.files && event.target.files.length) {
      //store the files in file array
      const [file] = event.target.files;
      //read the file
      reader.readAsDataURL(file);
      //after reading event
      reader.onload = () => {
        this.imageSrc = reader.result as string;  //store the image soruce
        //store the file in form
        this.form.patchValue({
          image: reader.result
        })
      }
    }

    console.log(this.form)
  }
}


