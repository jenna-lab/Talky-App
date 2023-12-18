import { Component } from '@angular/core';
import { UserLogin } from '../interface/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loggingIn: boolean = false;
  loggedInState: boolean = false;

  loggedIn = false;

  isAdmin: boolean = false;
  userData: UserLogin = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private api: UserService) {
  }

  onSubmit() {
    if (this.userData.email.trim() === '') {
      alert('email is required');
      return;
    }
    if (this.userData.password.trim() === '') {
      alert('password is required');
      return;
    }

    const userData = {
      email: this.userData.email,
      password: this.userData.password,
    };

    this.api.login(this.userData).then((data: any) => {
      localStorage.setItem('token', data.token);
      // console.log(data);
      try {
        this.api.checkUserDetails(data.token).then((data: any) => {
          console.log(data);

          localStorage.setItem('isLoggedIn', `${true}`);
          localStorage.setItem('user_id', `${data.info.user_id}`);
          this.router.navigate(['/user']);
          
          
        });
      } catch (error: any) {
        console.log(error);
      }
    });
  }

  navigateToForgotPassword = () => {
    this.router.navigate(['/forgotpwd']);
  };
  navigateToResetPassword = () => {
    this.router.navigate(['/reset-password']);
  };
  navigateToRegister = () => {
    this.router.navigate(['/register']);
  };
}
