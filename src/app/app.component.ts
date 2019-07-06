import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from './services/userAuthentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'nasa-project';

  constructor(private userAuthService: UserAuthenticationService,
              private router: Router){ }

  ngOnInit(){
    this.userAuthService.getUserAuthenticationStatusAndMethods().subscribe(
      ()=>{
        this.userAuthService.userIsAuthenticated.next(true);
      },
      ()=>{
        this.userAuthService.userIsAuthenticated.next(false);
      }
    );

    this.userAuthService.userIsAuthenticated.subscribe(
      (status)=>{
        if(status === false){
          this.router.navigate(['/']);
        }
      }
    );
  }
}
