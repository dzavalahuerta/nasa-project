import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class CrossComponentCommunicationService {
  userInputApod = new Subject();
  
  constructor(private serverService: ServerService) { }

  getUserInputApod(userInput){
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
        this.userInputApod.next(tenApodArray);
      });
  }
}
