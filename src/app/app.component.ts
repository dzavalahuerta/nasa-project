import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from './services/userAuthentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'nasa-project';

  constructor(private userAuthService: UserAuthenticationService){ }

  ngOnInit(){
  }
}
