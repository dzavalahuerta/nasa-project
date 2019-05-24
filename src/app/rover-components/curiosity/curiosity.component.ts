import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-curiosity',
  templateUrl: './curiosity.component.html',
  styleUrls: ['./curiosity.component.css']
})
export class CuriosityComponent implements OnInit {
  infiniteScrollToggle = false;
  missionManifest;
  currentSol: number;
  currentPageOfSol: number;
  totalPhotosInCurrentSol: number;

  photosOfCurrentSol = [];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    // i might not keep this
    // document.body.style.backgroundColor = 'rgba(234, 224, 200, 0.938)';

    this.currentSol = 2;
    this.currentPageOfSol = 1;

    this.serverService.getMissionManifest('curiosity')
      .subscribe(
        async missionManifest=>{
          this.missionManifest = await missionManifest;
          let allPhotosFromRover = this.missionManifest.photos;
          if(this.currentSol > allPhotosFromRover.length/2){
            for (let i = allPhotosFromRover.length-1; i >= 0; i--) {
              let element = allPhotosFromRover[i];
              if(element.sol === this.currentSol){
                this.totalPhotosInCurrentSol = element.total_photos;
                break;
              }
            }
          }
          else{
            for (let i = 0; i < allPhotosFromRover.length; i++) {
              let element = allPhotosFromRover[i];
              if(element.sol === this.currentSol){
                this.totalPhotosInCurrentSol = element.total_photos;
                break;
              }
            }
          }   
        }
      );

    this.serverService.getPageOfPhotosOfSol('curiosity', this.currentSol, this.currentPageOfSol)
      .subscribe(
        (photos: [])=>{
          this.photosOfCurrentSol = photos;
        }
      );
  }

  getNextPageOfPhotos(){
    this.infiniteScrollToggle = true;

    let maximumPagesOfPhotosForCurrentSol = Math.ceil(this.totalPhotosInCurrentSol/25);
    
    if(this.currentPageOfSol === maximumPagesOfPhotosForCurrentSol){
      return;
    }
    else{
      this.currentPageOfSol += 1;
      this.serverService.getPageOfPhotosOfSol('curiosity', this.currentSol, this.currentPageOfSol)
      .subscribe(
        (nextPageOfPhotos: [])=>{
          nextPageOfPhotos.forEach((photo, index) => {
            this.photosOfCurrentSol.push(photo);
            if(index === nextPageOfPhotos.length-1){
              this.infiniteScrollToggle = false;
            }
          });
        }
      );
    }
  }
}
