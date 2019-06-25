import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NasaApiService } from 'src/app/services/nasa-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curiosity',
  templateUrl: './curiosity.component.html',
  styleUrls: ['./curiosity.component.sass']
})
export class CuriosityComponent implements OnInit, OnDestroy {
  @ViewChild('form') form;
  solSelectorForm: FormGroup;
  infiniteScrollToggle = false;
  loading = false;
  missionManifest;
  currentSol: number;
  currentPageOfSol: number;
  totalPhotosInCurrentSol: number;
  photosOfCurrentSol = [];
  solDoesNotExistCase = [{"img_src": "https://i.stack.imgur.com/m6Gv4.png"}];

  constructor(private nasaApiService: NasaApiService) { }

  checkPageYOffset(){
    if(window.pageYOffset > 2200){
      return true;
    }
    else if(window.pageYOffset <= 2200){
      return false;
    }
  }

  ngOnInit() {
    document.body.style.backgroundColor = 'rgba(234, 224, 200, 0.938)';

    window.addEventListener('scroll', this.checkPageYOffset, true);

    this.solSelectorForm = new FormGroup({
      'selectedSol': new FormControl(null, Validators.required, this.invalidSol.bind(this))
    });

    this.currentSol = 1;
    this.currentPageOfSol = 1;
    
    this.nasaApiService.getPageOfPhotosOfSol('curiosity', this.currentSol, this.currentPageOfSol)
      .subscribe(
        (photos: [])=>{
          this.photosOfCurrentSol = photos;
        }
      );

    let missionManifestCall = ()=>{
      this.nasaApiService.getMissionManifest('curiosity')
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
          },
          ()=>{
            missionManifestCall();
          }
        );
    }
    missionManifestCall();
  }

  getNextPageOfPhotos(){
    this.infiniteScrollToggle = true;

    let maximumPagesOfPhotosForCurrentSol = Math.ceil(this.totalPhotosInCurrentSol/25);
    
    if(this.currentPageOfSol === maximumPagesOfPhotosForCurrentSol || maximumPagesOfPhotosForCurrentSol === 0){
      this.infiniteScrollToggle = false;
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
        },
        ()=>{
          this.currentPageOfSol -= 1;
          this.infiniteScrollToggle = false;
        }
      );
    }
  }

  getSpecificSol(){
    this.loading = true;
    this.currentSol = this.solSelectorForm.value.selectedSol;
    this.currentPageOfSol = 1;

    let allPhotosFromRover = this.missionManifest.photos;
      if(this.currentSol > allPhotosFromRover.length/2){
        for (let i = allPhotosFromRover.length-1; i >= 0; i--) {
          let element = allPhotosFromRover[i];
          if(element.sol === this.currentSol){
            this.totalPhotosInCurrentSol = element.total_photos;
            break;
          }
          else{
            this.totalPhotosInCurrentSol = 0;
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
          else{
            this.totalPhotosInCurrentSol = 0;
          }
        }
      }

    this.serverService.getPageOfPhotosOfSol('curiosity', this.currentSol, this.currentPageOfSol)
      .subscribe(
        (photos: [])=>{
          if(photos.length === 0){
            this.loading = false;
            this.photosOfCurrentSol = this.solDoesNotExistCase;
          }
          else{
            this.loading = false;
            this.photosOfCurrentSol = photos;
          }
        }
      );    
  }

  scrollUp(){
    this.form.nativeElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

  invalidSol(control: FormControl): Promise<any> | Observable<any>{
    let maxSol = this.missionManifest.max_sol;
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(() => {        
        if(control.value < 1 || control.value > maxSol){
          resolve({'invalid sol': true});
        }
        else{
          resolve(null);
        }
      }, 50);
    });
    return promise;
  }

  ngOnDestroy(){
    window.scrollTo(0,0);
    window.removeEventListener('scroll', this.checkPageYOffset, true);
  }
}
