import { Injectable } from '@angular/core';
import { UserLogin, userDetails } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor() { }

  async login(userLogins: UserLogin){
    let response = await fetch('http://localhost:4700/user/login', {
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userLogins)
    })

    const data = await response.json()
    let token = data.token
    localStorage.setItem('token', token)

    console.log(token);
    

    return data
  }

  async registerUser (userdetails: userDetails){
    let response = await fetch('http://localhost:4700/user/register', {
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userdetails)
    })

    const data = await response.json()

    console.log(data); 

    return data
  }}
