import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  localStrategyUserisAuthenticated = new Subject();
  
  constructor(private http: HttpClient) { }

  registerNewUser(userInfo: {email: String, password: String}){
    return this.http.post('/users/signup', userInfo);
  }

  logInLocalStrategy(userInfo: {email: String, password: String}){
    return this.http.post('/users/signin', userInfo);
  }

  signInGoogle(access_token){
    return this.http.post('/users/oauth/google', {access_token});
  }

  signInFacebook(access_token){
    return this.http.post('/users/oauth/facebook', {access_token});
  }
}
