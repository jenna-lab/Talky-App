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

}
