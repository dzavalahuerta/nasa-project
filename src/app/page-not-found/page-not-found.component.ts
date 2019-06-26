import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';
import { UserAuthenticationService } from '../services/userAuthentication.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(private cccService: CrossComponentCommunicationService,
              private userAuthService: UserAuthenticationService) { }

  ngOnInit() {
    this.cccService.currentlyOnPageNotFoundRoute(true);
    
    const jwt = localStorage.getItem('JWT_TOKEN');
    if(jwt){
      this.userAuthService.userIsAuthenticated.next(true);
    }
  }

  ngOnDestroy(){
    this.cccService.currentlyOnPageNotFoundRoute(false);
  }
}
