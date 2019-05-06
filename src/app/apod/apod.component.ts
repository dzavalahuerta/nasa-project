import { Component, OnInit } from '@angular/core';
import { ApodServiceService } from '../services/apod-service.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class APODComponent implements OnInit {
  apodArray: {};

  constructor(private apodService: ApodServiceService) { }

  ngOnInit() {
    this.apodService.getApodArray()
      .subscribe((apodArray)=>{
        this.apodArray = apodArray;
      });
  }
}
