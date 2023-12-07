import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor() { 
    this.thissad();
  }

  thissad(){
    console.log("I am working");
    
  }

 @Input('close') close!: boolean ;

  about: string = '';
  username: string = '';
  address: string = '';

  closeModal() {
    this.close = !this.close;
  }

  updateProfile() {
    console.log('Updating profile...');
    // this.closeModal();
  }
}
