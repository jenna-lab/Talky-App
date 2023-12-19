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
<<<<<<< HEAD
=======
  userData: UserRegister = {
    email: '',
    password: '',
    userName: '',
  };
  pwd: {
    confirmPassword: string;
  } = {
    confirmPassword: '',
  };
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

   registrationForm!: FormGroup

<<<<<<< HEAD
    
  constructor(private router:Router,private authService: AuthService, private fb:FormBuilder){
=======
    const userData = {
      userName: this.userData.userName,
      email: this.userData.email,
      password: this.userData.password,
      role: 'user',
    };
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

  
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
<<<<<<< HEAD

  ngOnInit(): void {
    
  }

    createUser(){
    console.log(this.registrationForm.value);
    if(this.registrationForm.valid){
      this.router.navigate(['/login']);
  }


=======
  navigateToLogin = () => {
    this.router.navigate(['/login']);
  };
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
}
}
