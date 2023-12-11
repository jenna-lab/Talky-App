import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
   postContent: string = '';
  imageInput: any;

    submitPost(form: any) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
    } else {
      console.log('Form is invalid.');
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
