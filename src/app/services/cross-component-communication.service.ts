import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class CrossComponentCommunicationService {
  specificApod = new Subject();
  
  constructor(private serverService: ServerService) { }
  
  // this along with this.specificApod allows the user input from
  // the NavbarComponents form to be used to find a new apod from
  // the API and send it to the APODComponent so that it could
  // render the apod and the 9 days that follow it.
  getSpecificApod(userInput){
    // i had to do this to take advantage of the fact
    // that for some reason the RESTAPI subtracts 1 off
    // of the day so instead of changing it, because it 
    // works in my favor for the other calls to the API,
    // i just added one here so the user gets back the date
    // they actually searched.
    let userInputDate = new Date(userInput);
    let year = userInputDate.getFullYear();
    let month = userInputDate.getMonth()+1;
    let day = userInputDate.getDate()+1;
    let correctDate = new Date(`${year}-${month}-${day}`);

    this.serverService.getTenApodJSON(correctDate)
      .subscribe((tenApodArray)=>{
        this.specificApod.next(tenApodArray);
      });
  }
}
