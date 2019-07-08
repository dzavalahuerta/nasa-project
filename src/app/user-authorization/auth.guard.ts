import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from './userAuthentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  constructor(private userAuthService: UserAuthenticationService,
              private router: Router){ }
  
  async canActivate(){
    try {
      await this.userAuthService.getUserAuthenticationStatusAndMethods().toPromise();
      this.userAuthService.userIsAuthenticated = true;
      this.router.navigate(['/apod']);
    }
    catch (error) {
      this.userAuthService.userIsAuthenticated = false; 
      return true;
    }
  }
}
