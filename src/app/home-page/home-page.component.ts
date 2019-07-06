import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthenticationService } from '../services/userAuthentication.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  invalidEmail = false;
  emailInUse = false;

  constructor(private cccService: CrossComponentCommunicationService,
              private userAuthService: UserAuthenticationService,
              private socialLoginService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cccService.currentlyOnHomePageRoute(true);

    const jwt = localStorage.getItem('JWT_TOKEN');
    if(jwt){
      this.router.navigate(['/apod'], { replaceUrl: true });
    }

    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitSignUpForm(){
    this.userAuthService.registerNewUser(this.signUpForm.value).subscribe(
      (res: {token: string, methods: [String]})=>{
        localStorage.setItem('JWT_TOKEN', res.token);
        this.invalidEmail = false;
        this.emailInUse = false;
        this.userAuthService.userIsAuthenticated.next(true);          this.userAuthService.userAuthenticationMethods = res.methods;
        this.router.navigate(['/apod'], { relativeTo: this.route });
      },
      error=>{
        if(error.status === 400){
          this.invalidEmail = true;
        }
        else if(error.status === 403){
          this.emailInUse = true;
        }
      }
    );
  }

  async onGoogleOAuth(){
    try{
      let res = await this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.userAuthService.signInGoogle(res.authToken).subscribe(
        (res: {token: string, methods: [String]})=>{
          localStorage.setItem('JWT_TOKEN', res.token);
          this.userAuthService.userIsAuthenticated.next(true);
          this.userAuthService.userAuthenticationMethods = res.methods;
          this.router.navigate(['/apod'], { relativeTo: this.route });
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
  
  async onFacebookOAuth(){
    try{
      let res = await this.socialLoginService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.userAuthService.signInFacebook(res.authToken).subscribe(
        (res: {token: string, methods: [String]})=>{
          localStorage.setItem('JWT_TOKEN', res.token);
          this.userAuthService.userIsAuthenticated.next(true);
          this.userAuthService.userAuthenticationMethods = res.methods;
          this.router.navigate(['/apod'], { relativeTo: this.route });
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

  ngOnDestroy(){
    this.cccService.currentlyOnHomePageRoute(false);
  }
}