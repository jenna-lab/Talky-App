import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UploadimageService } from '../services/uploadimage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
 postContent: string = '';
  imageInput: any; 
  form!: FormGroup;
  postform!: FormGroup;
  user_id : string = localStorage.getItem('user_id') || '';

    constructor(private upload:UploadimageService,private formBuilder: FormBuilder) {

      this.postform = this.formBuilder.group({
      postContent: '',
    });

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


  // submitPost(form: NgForm): void {
  //   if (form.valid) {


  //     console.log('Post submitted:', this.postContent, this.imageInput);
  //   }
  // }

  submitPost() {
    // Your logic to share the post
    console.log("sadasdas ", this.postform.value);
  
    if (this.postform.valid) {
      const imageUrls: string[] = [];
    if(this.files.length > 0 ){
   // Upload all images
   for (let index = 0; index < this.files.length; index++) {
    const data = new FormData();
    const file_data = this.files[index];
    data.append('file', file_data);
    data.append('upload_preset', 'voh4yhha');
    data.append('cloud_name', 'dtldrtspk');

    this.upload.uploadImage(data).subscribe((res) => {
      console.log(res.secure_url);
      imageUrls.push(res.secure_url);

      // If all images are uploaded, proceed to createPost
      if (imageUrls.length === this.files.length) {
        // Set the array of image URLs in the form
        this.form.value.postImage = imageUrls ;

        // Create the post
        let details = this.form.value;
        details.created_by_user_id = this.user_id;

        // this.postService.createPost(details).subscribe(
        //   (response) => {
        //     console.log(response);
        //     this.toastr.success('Form submitted successfully!', 'Success');

        //     // Clear the form or take other actions as needed
        //     this.postForm.reset();
        //     this.postFiles = []; // Clear the array of uploaded files

        //   },
        //   (error) => {
        //     // Handle error
        //     this.toastr.error(`${error}`, 'Error');
        //     console.error('Error submitting form:', error);
        //   }
        // );
      }
    });
  }
    }
    // else{

    //           let details = this.form.value;
    //           details.created_by_user_id = this.user_id;
    //    this.form.value.postImage = [] ;
    //           // this.postService.createPost(details).subscribe(
    //           //   (response) => {
    //           //     console.log(response);
    //           //     this.toastr.success('Form submitted successfully!', 'Success');
      
    //           //     // Clear the form or take other actions as needed
    //           //     this.postForm.reset();
    //           //     this.postFiles = []; // Clear the array of uploaded files
      
    //           //   },
    //           //   (error) => {
    //           //     // Handle error
    //           //     this.toastr.error(`${error}`, 'Error');
    //           //     console.error('Error submitting form:', error);
    //           //   }
    //           // );
    // }
   
    }
    

    else {
      // Your form is invalid, display error messages or take appropriate action
      console.log('Form is invalid. Please check the fields.',this.form.value);
    }

    

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
