import { Component, OnInit } from '@angular/core';
import { ApodServiceService } from '../services/apod-service.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class APODComponent implements OnInit {
  tenApodArray: [];

  constructor(private apodService: ApodServiceService) { }

  ngOnInit() {
    this.apodService.getTenApodJSON()
      .subscribe((tenApodArray)=>{
        this.tenApodArray = tenApodArray;
      });
  }

  while () {
    // maybe for the scroll feature
  }
}
