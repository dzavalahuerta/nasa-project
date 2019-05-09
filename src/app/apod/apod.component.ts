import { Component, OnInit } from '@angular/core';
import { ApodServiceService } from '../services/apod-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class APODComponent implements OnInit {
  apodArray: [] = [];
  infiniteScrollToggle = false;


  constructor(private apodService: ApodServiceService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let newDate = new Date();
    this.apodService.getTenApodJSON(newDate)
      .subscribe((tenApodArray)=>{
        tenApodArray.forEach(apod => {
          this.apodArray.push(apod);
        });
      });
  }

  // sanitizer.bypassSecurityTrustResourceUrl(myurl)

  getDateForNextBatch(){
    let indexOfLastItem = this.apodArray.length-1;
    let lastItem: {date: string} = this.apodArray[indexOfLastItem];
    let dateForNextBatch = lastItem.date;
    return dateForNextBatch;
  }

  getTenMoreApod(){
    // this is to prevent more than one request
    // being triggered at once
    this.infiniteScrollToggle = true;

    let date = this.getDateForNextBatch();

    this.apodService.getTenApodJSON(date)
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
