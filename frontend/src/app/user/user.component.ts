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

}
