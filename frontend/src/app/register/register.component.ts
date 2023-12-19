import { Component } from '@angular/core';
import { UserRegister, userDetails } from '../interface/user';

import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

   registrationForm!: FormGroup

    
  constructor(private router:Router,private authService: AuthService, private fb:FormBuilder){

  
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    
  }

    createUser(){
    console.log(this.registrationForm.value);
    if(this.registrationForm.valid){
      this.router.navigate(['/login']);
  }


}
}
