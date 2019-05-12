import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-curiosity',
  templateUrl: './curiosity.component.html',
  styleUrls: ['./curiosity.component.css']
})
export class CuriosityComponent implements OnInit {
  missionManifest;
  pageOfPhotos = [];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    window.document.body.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/4/4d/Pan_segment1.gif)";
    window.document.body.style.backgroundSize = "cover";
    window.document.body.style.backgroundPosition = "center";

    this.serverService.getMissionManifest('curiosity')
      .subscribe(
        missionManifest=>{
          this.missionManifest = missionManifest;
        }
      );

    this.serverService.getPageOfPhotosOfSol('curiosity', 1, 1)
      .subscribe(
        (pageOfPhotos: [])=>{
          this.pageOfPhotos = pageOfPhotos;
        }
      );
  }

  // the array is updated by each click on the numbers which alter which paeg of the pagination is rendered
  // aka there will be nums that work like pagination and the array which updates the carousel will
  // be set equal to the API request that is linked to that number

}
