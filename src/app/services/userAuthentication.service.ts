import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  isUserAuthenticated = new Subject();
  jwt = new Subject();
  backEndErrorMessage = new Subject();
  
  constructor() { }
}
