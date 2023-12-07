import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // isProfileModalOpen: boolean = false;
  close!:boolean
  showProfileModal() {
    this.close = !this.close  
  }

  // closeProfileModal() {
  //   this.isProfileModalOpen = false;
  // }

  closeModal(){
    this.close = false
  }

}
