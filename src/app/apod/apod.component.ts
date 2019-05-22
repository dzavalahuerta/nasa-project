import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from '../services/server.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class APODComponent implements OnInit, OnDestroy {
  apodArray: [] = [];
  infiniteScrollToggle = false;
  noScroll = true;
  sanitize = (url)=>{
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  constructor(private serverService: ServerService,
              private cccService: CrossComponentCommunicationService,
              public sanitizer: DomSanitizer) { }

  checkPageYOffset(){
    if(window.pageYOffset > 500){
      return true;
    }
    else if(window.pageYOffset <= 500){
      return false;
    }
  }
  
  ngOnInit() {
    window.document.body.style.background = "white";

    window.addEventListener('scroll', this.checkPageYOffset, true);
    
    this.cccService.currentlyOnApodRoute(true);
    
    this.cccService.userInputApodActivated
      .subscribe(
        ()=>{
          this.scrollUp();
        }
      );

    this.cccService.userInputApod
    .subscribe((specificApod: [])=>{
      specificApod.forEach((apod,index)=>{
        if(apod === ''){
          specificApod.splice(index, 1);
        }
      });
      this.apodArray = specificApod;
    });
    
    let currentDate = new Date();
    this.serverService.getTenApodJSON(currentDate)
    .subscribe((tenApodArray)=>{
      tenApodArray.forEach((apod, index) => {
        if(apod != ''){
          this.apodArray.push(apod);
        }
        if(index === tenApodArray.length-1){
          this.noScroll = false;
        }
      });
    });
  }

  scrollUp(){
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  getDateForNextBatch(){
    let indexOfLastItem = this.apodArray.length-1;
    let lastItem: {date: string} = this.apodArray[indexOfLastItem];
    let dateForNextBatch = lastItem.date;
    return dateForNextBatch;
  }

  getTenMoreApod(){
    this.infiniteScrollToggle = true;

    let dateForNextBatch = this.getDateForNextBatch();
    
    if(dateForNextBatch === '1996-01-01'){
      this.infiniteScrollToggle = false;
      return;
    }

    this.serverService.getTenApodJSON(dateForNextBatch)
      .subscribe((tenApodArray)=>{
        tenApodArray.forEach((apod, index) => {
          if(apod != ''){
            this.apodArray.push(apod);
          }
          if(index === tenApodArray.length-1){
            this.infiniteScrollToggle = false;
          }
        });
        if(tenApodArray.length === 0){
          this.infiniteScrollToggle = false;
        }
      });
  }

  ngOnDestroy(){
    this.cccService.currentlyOnApodRoute(false);
    window.removeEventListener('scroll', this.checkPageYOffset, true);
  }
}
