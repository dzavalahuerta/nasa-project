import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserAuthenticationService implements OnInit {
  userIsAuthenticated = new Subject();
  // userIsAuthenticated: boolean;
  userAuthenticationMethods: string[] = [''];

  constructor(private http: HttpClient) { }
  
  ngOnInit(){
    // this.userIsAuthenticatedController.subscribe(
    //   (status: boolean)=>{
    //     this.userIsAuthenticated = status;
    //   }
    // );
  }
  
  getUserAuthenticationStatusAndMethods(){
    return this.http.get('/users/get-user-authentication-status-and-methods');
  };

  registerNewUser(userInfo: {email: String, password: String}){
    return this.http.post('/users/signup', userInfo);
  };

  logInLocalStrategy(userInfo: {email: String, password: String}){
    return this.http.post('/users/signin', userInfo);
  };

  logOut(){
    return this.http.get('/users/signout');
  };

  signInGoogle(access_token){
    return this.http.post('/users/oauth/google', {access_token});
  };
  
  linkGoogleAccount(access_token){
    return this.http.post('/users/oauth/link/google', {access_token});
  };
  
  unlinkGoogleAccount(){
    return this.http.post('/users/oauth/unlink/google', null);
  };

  signInFacebook(access_token){
    return this.http.post('/users/oauth/facebook', {access_token});
  };

  linkFacebookAccount(access_token){
    return this.http.post('/users/oauth/link/facebook', {access_token});
  };

  unlinkFacebookAccount(){
    return this.http.post('/users/oauth/unlink/facebook', null);
  };
}
