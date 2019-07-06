import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { UserAuthenticationService } from 'src/app/services/userAuthentication.service';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-link-social-media',
  templateUrl: './link-social-media.component.html',
  styleUrls: ['./link-social-media.component.sass']
})
export class LinkSocialMediaComponent implements OnInit {
  userAuthenticationMethods: string[];

  constructor(private userAuthService: UserAuthenticationService,
              private socialLoginService: AuthService) { }

  ngOnInit() {
    this.userAuthenticationMethods = this.userAuthService.userAuthenticationMethods;
    if(this.userAuthenticationMethods === undefined){
      this.userAuthService.getUserAuthenticationMethods().subscribe(
        (res: { methods: string[]})=>{
          this.userAuthenticationMethods = res.methods;
        },
        (error)=>{
          console.error(error);
        }
      );
    }
  }

  async linkGoogleAccount(){
    try{
      let res = await this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.userAuthService.linkGoogleAccount(res.authToken).subscribe(
        (res: { methods: string[] })=>{
          this.userAuthenticationMethods = res.methods;
        },
        (error)=>{
          console.error(error);
        }
      );
    }
    catch(error){
      console.error(error);
    }
  }
    
  async linkFacebookAccount(){
    try{
      let res = await this.socialLoginService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.userAuthService.linkFacebookAccount(res.authToken).subscribe(
        (res: { methods: string[] })=>{
          this.userAuthenticationMethods = res.methods;
        },
        (error)=>{
        console.error(error);
        }
      );
    }
    catch(error) {
      console.error(error);
    }
  }

  unlinkGoogleAccount(){
    this.userAuthService.unlinkGoogleAccount().subscribe(
      (res: {methods: string[]})=>{
        this.userAuthenticationMethods = res.methods;
      },
      (error)=>{
        alert(error);
      }
    );
  }
    
  unlinkFacebookAccount(){
    this.userAuthService.unlinkFacebookAccount().subscribe(
      (res: {methods: string[]})=>{
        this.userAuthenticationMethods = res.methods;
      },
      (error)=>{
        alert(error);
      }
    );
  }

  doesUserAuthenticationMethodsInclude(method: string){
    if(this.userAuthenticationMethods.includes(method)){
      return true;
    }
    else{
      return false;
    }
  }
}