import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';
import { NasaApiService } from '../services/nasa-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;

  constructor(private cccService: CrossComponentCommunicationService,
              private nasaApiService: NasaApiService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    window.document.body.style.background = "white";

    this.cccService.currentlyOnHomePageRoute(true);

    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitSignUpForm(){
    this.nasaApiService.registerNewUser(this.signUpForm.value).subscribe(
      (res: {token: string})=>{
        localStorage.setItem('JWT_TOKEN', res.token);
        this.router.navigate(['/apod'], { relativeTo: this.route });
      },
      error=>{
        // eventually make it so the user is displayed an error message
        console.error(error.message);
      }
    );
  }

  onGoogleOAuth(){

  }

  onFacebookOAuth(){

  }

  ngOnDestroy(){
    this.cccService.currentlyOnHomePageRoute(false);
  }
}