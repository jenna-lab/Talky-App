import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotpwdService {

<<<<<<< HEAD
   constructor() {}
  async forgotpwd(email: string) {
    const response = await fetch(`http://localhost:4700/user/forgotpwd`, {
=======
  constructor() {}

  async forgotpwd(email: string) {
    const response = await fetch(`http://localhost:4700/user/forgotpwd`, {
      
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    console.log(response + "i reached here");

    return response.json();
<<<<<<< HEAD
  }
=======
  }  
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
}
