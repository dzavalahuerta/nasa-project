import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-curiosity',
  templateUrl: './curiosity.component.html',
  styleUrls: ['./curiosity.component.css']
})
export class CuriosityComponent implements OnInit {
  missionManifest;
  amountOfPagesForCurrentSol: [] = [];
  pageOfPhotos = [];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getMissionManifest('curiosity')
      .subscribe(
        missionManifest=>{
          this.missionManifest = missionManifest;
        }
      );

    this.serverService.getPageOfPhotosOfSol('curiosity', 0, 0)
      .subscribe(
        (pageOfPhotos: [])=>{
          this.pageOfPhotos = pageOfPhotos;
          this.amountOfPagesForCurrentSol = this.missionManifest.photos;
        }
      );
  }

  sameSolDifferentPage(){

  }

  newSolRequest(){

  }
}
