import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.document.body.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/4/4d/Pan_segment1.gif)";
    window.document.body.style.backgroundSize = "cover";
    window.document.body.style.backgroundPosition = "center";
  }

  // the array is updated by each click on the numbers which alter which paeg of the pagination is rendered
  // aka there will be nums that work like pagination and the array which updates the carousel will
  // be set equal to the API request that is linked to that number

}
