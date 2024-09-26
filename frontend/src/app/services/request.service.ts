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

  checkLogin(username: String, password: String): Observable<any> {
    return this.httpClient.get(`${this.urlApi}/login?user=${username}&pass=${password}`);
  }

}
