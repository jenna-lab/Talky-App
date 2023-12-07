import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor() {}
  async forgotpwd(email: string) {
    const response = await fetch(`http://localhost:9000/user/forgotpwd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    console.log(response);

    return response.json();
  }}
