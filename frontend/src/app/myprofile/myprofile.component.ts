import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  viewposts=true
  viewfollowers=false
  viewfollowing=false
    

 
  ViewPosts(){
    this.viewposts = true
    this.viewfollowers = false
    this.viewfollowing = false
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

  // ViewProfile() {
  //  this.viewProfile = true
  //   this.viewTimeline = false
  // }

}
