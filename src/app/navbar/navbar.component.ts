import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrossComponentCommunicationService } from '../services/cross-component-communication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;
  apodRoute = false;

  constructor(private cccService: CrossComponentCommunicationService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchFormInput': new FormControl(null, [Validators.required], this.invalidDate)
    });

    this.cccService.currentlyOnApodRouteStatus
      .subscribe(
        (status: boolean)=>{
          this.apodRoute = status;
        }
      );
  }

  onSubmitSearchForm(){
    this.cccService.getUserInputApod(this.searchForm.value.searchFormInput);
  }

  invalidDate(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(() => {
        let regex = new RegExp(/((199[6-9]|20[0-1][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
        
        let currentDate = new Date();
        let userInputDate = new Date(control.value);

        // document.querySelector('input[placeholder=yyy-mm-dd]');
        
        if(!regex.test(control.value)){
          resolve({'invalid date': true});
        }
        else if(currentDate < userInputDate){
          resolve({'invalid date': true});
        }
        else{
          resolve(null);
        }
      }, 100);
    });
    return promise;
  }
}
