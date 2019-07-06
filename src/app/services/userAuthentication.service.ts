import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

function httpOptions(){
  return {headers: new HttpHeaders({'Authorization': localStorage.getItem('JWT_TOKEN')})};
}

@Injectable({
  providedIn: 'root'
})

export class UserAuthenticationService {
  userIsAuthenticated = new Subject();
  userAuthenticationMethods: [String] = [''];

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

  linkGoogleAccount(access_token){
    return this.http.post('/users/oauth/link/google', {access_token}, httpOptions());
  }

  linkFacebookAccount(access_token){
    return this.http.post('/users/oauth/link/facebook', {access_token}, httpOptions());
  }

  unlinkGoogleAccount(){
    return this.http.post('/users/oauth/unlink/google', null, httpOptions());
  }

  unlinkFacebookAccount(){
    return this.http.post('/users/oauth/unlink/facebook', null, httpOptions());
  }
}
