import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   async checkUserDetails(token: string) {
    const response = await fetch(`${this.userUrl}/check`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    return response.json();
  }

  userUrl = 'http://localhost:9000/user';

  constructor() {}

  async register(userData: UserRegister) {
    const response = await fetch(`${this.userUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log(response);

    return response.json();
  }
    async login(userData: UserLogin) {
    const response = await fetch(`${this.userUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    // console.log(response.json());

    return response.json();
  }

}
