import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

function setAuthHeader(){
  return {headers: new HttpHeaders({'Authorization': localStorage.getItem('JWT_TOKEN')})};
}

@Injectable({
  providedIn: 'root'
})

export class UserAuthenticationService {
  userIsAuthenticated = new Subject();
  userAuthenticationMethods: string[];

  setUserAuthenticationMethods(methods: string[]){
    this.userAuthenticationMethods = methods;
  };

  constructor(private http: HttpClient) { }

  getUserAuthenticationMethods(){
    return this.http.get('/users/get-user-authentication-methods', setAuthHeader());
  };

  registerNewUser(userInfo: {email: String, password: String}){
    return this.http.post('/users/signup', userInfo);
  };

  logInLocalStrategy(userInfo: {email: String, password: String}){
    return this.http.post('/users/signin', userInfo);
  };

  signInGoogle(access_token){
    return this.http.post('/users/oauth/google', {access_token});
  };

  signInFacebook(access_token){
    return this.http.post('/users/oauth/facebook', {access_token});
  };

  linkGoogleAccount(access_token){
    return this.http.post('/users/oauth/link/google', {access_token}, setAuthHeader());
  };

  linkFacebookAccount(access_token){
    return this.http.post('/users/oauth/link/facebook', {access_token}, setAuthHeader());
  };

  unlinkGoogleAccount(){
    return this.http.post('/users/oauth/unlink/google', null, setAuthHeader());
  };

  unlinkFacebookAccount(){
    return this.http.post('/users/oauth/unlink/facebook', null, setAuthHeader());
  };
}
