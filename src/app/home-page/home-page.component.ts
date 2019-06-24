import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;

  constructor(private cccService: CrossComponentCommunicationService) { }

  ngOnInit() {
    window.document.body.style.background = "white";

    this.cccService.currentlyOnHomePageRoute(true);

    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitSignUpForm(){

  }

  ngOnDestroy(){
    this.cccService.currentlyOnHomePageRoute(false);
  }
}