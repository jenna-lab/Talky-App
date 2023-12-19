import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDetails } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 constructor(private http:HttpClient) { }

  getUsers(){
    let token = localStorage.getItem('token') as string
    return this.http.get<{employees: userDetails[]}>('http://localhost:4700/user', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  createUser (user: userDetails){
    return this.http.post('http://localhost:4700/user/register', user)
  }

}
