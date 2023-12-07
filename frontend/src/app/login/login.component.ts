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

          localStorage.setItem('role', data.role);
          localStorage.setItem('isLoggedIn', `${true}`);
          localStorage.setItem('user_id', `${data.id}`);

          if (data.role === 'user') {
            localStorage.setItem('name', data.name);
            this.router.navigate(['/user']);
          }
          if (data.role === 'admin') {
            localStorage.setItem('name', data.name);
            this.router.navigate(['/admin']);
          }
        });
      } catch (error: any) {
        console.log(error);
      }
    });
  }

  navigateToForgotPassword = () => {
    this.router.navigate(['/forgot-password']);
  };
  navigateToResetPassword = () => {
    this.router.navigate(['/reset-password']);
  };
  navigateToRegister = () => {
    this.router.navigate(['/register']);
  };
}
