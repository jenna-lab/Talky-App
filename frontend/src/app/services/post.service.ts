import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
 
  createPost (post: any){
    return this.http.post('http://localhost:4700/post/createpost', post)
  }

   allPosts(): Observable<any> {
    return this.http.get<any>('http://localhost:4700/post/viewAllPosts')
  }

    async addComment(post_id: string, comment: any) {
    const response = await fetch(`http://localhost:4700/post/addcomment/${post_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token') || '',
      },
      body: JSON.stringify(comment),
    });
    console.log(response);
   

    return response.json();
  }


deletePost (post_id: string): Observable<any>{
  // const post = {
  //   user_id: localStorage.getItem('user_id') || '',
  // }

  //  const headers = new HttpHeaders({
  //   'Content-Type':  'application/json',
  //  'token': localStorage.getItem('token') || ''
  // })

  //  const options = {
  //     headers: headers,
  //     // body: post  // Include the post object in the body property
  //   };

    return this.http.delete<any>(`http://localhost:4700/post/deletepost/${post_id}`, {
    headers : new HttpHeaders({
      'Content-Type':  'application/json',
      'token': localStorage.getItem('token') || '',
    })
    },
    )
  }

 
  
}

//  Posts(): Observable<any> {
  //   return this.http.get<any>('http://localhost:4700/post/viewSinglePost')
  // }