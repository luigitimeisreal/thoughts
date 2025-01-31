import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  urlApi: string = "http://localhost:3000/api"

  constructor(private httpClient: HttpClient) { }

  // Test if the server is working
  testApi() {
    return this.httpClient.get(`${this.urlApi}/`);
  }

  // Register a new user 
  registerUser(userData: any): Observable<any> {
    return this.httpClient.post(`${this.urlApi}/register`, userData);
  }

  publishTextPost(userData: any): Observable<any> {
    console.log("Data received service", userData);
    return this.httpClient.post(`${this.urlApi}/publish`, userData);
  }

  checkLogin(username: String, password: String): Observable<any> {
    return this.httpClient.get(`${this.urlApi}/login?user=${username}&pass=${password}`);
  }

  // Obtain 10 posts 
  obtain10Posts(currentPostNumber: Number) {
    return this.httpClient.get(`${this.urlApi}/posts?number=${currentPostNumber}`);
  }
  
  // Obtain current user
  obtainCurrentUser(userToken: any) {
    return this.httpClient.get(`${this.urlApi}/user?token=${userToken}`)    
  }

  addLikeToPost(userToken: string, postId: string) {
    let likeData = {
      userToken: userToken,
      postId: postId
    }
    return this.httpClient.put(`${this.urlApi}/likes/add`, likeData);
  }

  removeLikeOfPost(userToken: string, postId: string) {
    let likeData = {
      userToken: userToken,
      postId: postId
    }
    return this.httpClient.request('delete', `${this.urlApi}/likes/remove`, {
      body: likeData
    });    
  }

}
