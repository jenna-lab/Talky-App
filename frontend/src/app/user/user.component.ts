import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UploadimageService } from '../services/uploadimage.service';
import { PostService } from '../services/post.service';
import * as moment from 'moment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  {
 postContent: string = '';
  imageInput: any; 
  form!: FormGroup;
  postform!: FormGroup;
  user_id : string = localStorage.getItem('user_id') || '';
  posts:any[] = []
  comment:string = ''
  
    constructor(private upload:UploadimageService,private formBuilder: FormBuilder,private postService: PostService) {

      this.postform = this.formBuilder.group({
      postContent: '',
    });

  

    this.getAllPosts()
     }

      async addComment(post_id: string) {
      console.log(this.comment);
      const response = await this.postService.addComment(post_id, {
        commentContent: this.comment,
        user_id: this.user_id,
      });

      console.log(response);
      
    }
     
      getTimeFormNow(timePosted:any) {
      return moment(timePosted).fromNow()
     }
    
  
  files: File[] = [];

onSelect(event:any) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}


  getAllPosts(){
            this.postService.allPosts().subscribe(
          (response) => {
            console.log(response);
            this.posts = response.posts;

            console.log(this.posts);
            
  },
          (error) => {
            // Handle error
           
            console.error('Error submitting form:', error);
          }
            )
}

  submitPost() {
    console.log("sadasdas ", this.postform.value);
  
    if (this.postform.valid) {
      const imageUrls: string[] = [];
    if(this.files.length > 0 ){
   for (let index = 0; index < this.files.length; index++) {
    const data = new FormData();
    const file_data = this.files[index];
    data.append('file', file_data);
    data.append('upload_preset', 'voh4yhha');
    data.append('cloud_name', 'dtldrtspk');

    this.upload.uploadImage(data).subscribe((res) => {
      console.log(res.secure_url);
      imageUrls.push(res.secure_url);
        console.log(imageUrls.length,this.files.length);
        
   
        
        this.postform.value.imageInput = imageUrls[0] ;
        console.log("i am good ",this.user_id);

        // Create the post
        let details = this.postform.value;
        details.user_id = this.user_id;
        console.log(details);
        

        this.postService.createPost(details).subscribe(
          (response) => {
            console.log(response);
            this.getAllPosts()
            // Clear the form or take other actions as needed

          },
          (error) => {
            // Handle error
           
            console.error('Error submitting form:', error);
          }
        );
      // }
    });
  }
    }
  
   
    }
    

    else {
      // Your form is invalid, display error messages or take appropriate action
      console.log('Form is invalid. Please check the fields.',this.form.value);
    }


  }

  handleDeletePost(post_id : string, user_id: string) {
    const currentuserID = localStorage.getItem('user_id');
    console.log(post_id);
    console.log(user_id);
    console.log(currentuserID);
    
    if(currentuserID === user_id){
      console.log("sadasd");
    this.postService.deletePost(post_id).subscribe(
      (response) => {
        console.log(response);
        this.getAllPosts()
       
  },
  (error) => {

    console.error('Error submitting form:', error);
  }
    )}
}
  
    onImageChange(event: any) {
    const selectedFile = event.target.files[0];
    console.log('Selected image:', selectedFile);
  }

  
  viewposts=true
  viewfollowers=false
  viewfollowing=false
  viewProfile = false
  viewTimeline = true
 
  ViewPosts(){
    this.viewposts = true
    this.viewfollowers = false
    this.viewfollowing = false
  }

  ViewProfile() {
   this.viewProfile = true
    this.viewTimeline = false
    console.log("dfghjgggjghjg");

  }

  ViewTimeline() {
    console.log("sadasd");
    this.viewTimeline = true
    this.  viewProfile = false
    
  }

  ViewFollowers(){
    this.viewposts = false
    this.viewfollowers = true
    this.viewfollowing = false
  }
   ViewFollowing(){
    this.viewposts = false
    this.viewfollowers=false
    this.viewfollowing = true
  }

}
