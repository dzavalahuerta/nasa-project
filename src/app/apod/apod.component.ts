import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class APODComponent implements OnInit {
  subscription: Subscription;

  apodArray: [] = [];
  infiniteScrollToggle = false;


  constructor(private serverService: ServerService,
              private cccService: CrossComponentCommunicationService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscription = this.cccService.specificApod
      .subscribe((specificApod: [])=>{
        this.apodArray = specificApod;
      });

    let newDate = new Date();
    this.serverService.getTenApodJSON(newDate)
      .subscribe((tenApodArray)=>{
        tenApodArray.forEach(apod => {
          this.apodArray.push(apod);
        });
      });
  }

  // getDateForNextBatch(){
  //   let indexOfLastItem = this.apodArray.length-1;
  //   let lastItem: {date: string} = this.apodArray[indexOfLastItem];
  //   let dateForNextBatch = lastItem.date;
  //   return dateForNextBatch;
  // }

  getTenMoreApod(){
    // this is to prevent more than one request
    // being triggered at once
    this.infiniteScrollToggle = true;

    // let date = this.getDateForNextBatch();
    let indexOfLastItem = this.apodArray.length-1;
    let lastItem: {date: string} = this.apodArray[indexOfLastItem];
    let date = lastItem.date;

    this.serverService.getTenApodJSON(date)
      .subscribe((tenApodArray)=>{
        tenApodArray.forEach((apod, index) => {
            this.apodArray.push(apod);
          // this is to make sure another request
          // will not be made until the last request is rendered.
          if(index === tenApodArray.length-1){
            this.infiniteScrollToggle = false;
          }
        });
      });
  }
}
