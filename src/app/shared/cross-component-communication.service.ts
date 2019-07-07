import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NasaApiService } from '../NASA-api-content/nasa-api.service';

@Injectable()
export class CrossComponentCommunicationService {
  currentlyOnApodRouteStatus = new Subject();
  currentlyOnHomePageRouteStatus = new Subject();
  currentlyOnPageNotFoundRouteStatus = new Subject();
  userInputApod = new Subject();
  userInputApodActivated = new Subject();
  loadingApods = new Subject();

  constructor(private nasaApiService: NasaApiService) { }

  getUserInputApod(userInput){
    this.userInputApodActivated.next();
    // i had to do this to take advantage of the fact
    // that for some reason the RESTAPI subtracts 1 off
    // of the day so instead of changing it, because it 
    // works in my favor for the other calls to the API,
    // i just added one here so the user gets back the date
    // they actually searched.
    let userInputDate = new Date(userInput);
    let year = userInputDate.getFullYear();
    let month = userInputDate.getMonth()+1;
    let day = userInputDate.getDate();
    if(month === 12 && day === 31){
      year += 1;
      month = 1;
      day = 1;
    }
    else if(day < 31){
      day += 1;
    }
    let correctDate = new Date(`${year}-${month}-${day}`);

    this.nasaApiService.getTenApodJSON(correctDate)
      .subscribe((tenApodArray)=>{
        this.userInputApod.next(tenApodArray);
      });
  }

  currentlyOnApodRoute(status: boolean){
    this.currentlyOnApodRouteStatus.next(status);
  }
  
  currentlyOnHomePageRoute(status: boolean){
    this.currentlyOnHomePageRouteStatus.next(status);
  }

  currentlyOnPageNotFoundRoute(status: boolean){
    this.currentlyOnPageNotFoundRouteStatus.next(status);
  }
}
