import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrossComponentCommunicationService } from '../cross-component-communication.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(private cccService: CrossComponentCommunicationService) { }

  ngOnInit() {
    this.cccService.currentlyOnPageNotFoundRoute(true);
  }

  ngOnDestroy(){
    this.cccService.currentlyOnPageNotFoundRoute(false);
  }
}
