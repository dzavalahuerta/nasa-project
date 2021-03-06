import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrossComponentCommunicationService } from '../../shared/cross-component-communication.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthenticationService } from '../../user-authorization/userAuthentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;
  logInForm: FormGroup;
  loading = false;
  apodRoute = false;
  homePageRoute = false;
  pageNotFoundRoute = false;
  userIsAuthenticated = false;
  invalidUserCredentials = false;
  

  constructor(private cccService: CrossComponentCommunicationService,
              private userAuthService: UserAuthenticationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cccService.currentlyOnApodRouteStatus
      .subscribe(
        (status: boolean)=>{
          this.apodRoute = status;
        }
      );

    this.cccService.currentlyOnHomePageRouteStatus
      .subscribe(
        (status: boolean)=>{
          this.homePageRoute = status;
        }
      );

    this.cccService.currentlyOnPageNotFoundRouteStatus
      .subscribe(
          (status: boolean)=>{
            this.pageNotFoundRoute = status;
          }
        );

    this.userAuthService.userIsAuthenticated.subscribe(
      (status: boolean)=>{
        this.userIsAuthenticated = status;
      }
    );
    
    this.searchForm = new FormGroup({
      'searchFormInput': new FormControl(null, [Validators.required], this.invalidDate)
    });

    this.logInForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmitSearchForm(){
    this.loading = true;
    this.cccService.getUserInputApod(this.searchForm.value.searchFormInput);
    this.cccService.loadingApods
      .subscribe(
        (condition: boolean)=>{
          this.loading = condition;
        }
      );
  }

  onSubmitLogInForm(){
    this.userAuthService.logInLocalStrategy(this.logInForm.value).subscribe(
      ()=>{
        this.invalidUserCredentials = false;
        this.userAuthService.userIsAuthenticated.next(true);
        this.logInForm.reset();
        this.router.navigate(['/apod'], { relativeTo: this.route });
      },
      ()=>{
        this.invalidUserCredentials = true;
      }
    );
  }

  onLogOut(){
    this.userAuthService.logOut().subscribe(
      ()=>{
        this.userAuthService.userIsAuthenticated.next(false);
        this.router.navigate(['/']);
      },
      (error)=>{
        console.error(error);
      }
    );
  }

  invalidDate(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(() => {
        let regex = new RegExp(/((199[6-9]|20[0-1][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))/);
        
        let currentDate = new Date();
        let userInputDate = new Date(control.value);
        
        if(!regex.test(control.value)){
          resolve({'invalid date': true});
        }
        else if(currentDate < userInputDate){
          resolve({'invalid date': true});
        }
        else{
          resolve(null);
        }
      }, 100);
    });
    return promise;
  }
}
