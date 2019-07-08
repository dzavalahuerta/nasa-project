import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from './userAuthentication.service';

@Injectable({
  providedIn: 'root'
})
export class ContentGuard implements CanActivate {
  
  constructor(private userAuthService: UserAuthenticationService,
              private router: Router){ }
  
  async canActivate(){
    try {
      let res:any = await this.userAuthService.getUserAuthenticationStatusAndMethods().toPromise();
      this.userAuthService.userIsAuthenticated = true;
      this.userAuthService.userAuthenticationMethods = res.methods;
      return true;
    }
    catch (error) {
      this.userAuthService.userIsAuthenticated = false; 
      this.router.navigate(['/']);
    }
  }
}
