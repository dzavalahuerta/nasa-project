import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) { }

  getTenApodJSON(date){
    return this.http.get(`/api/10apod/${date}`).pipe(
      map((tenApodJSON: {tenApodArray: []})=>{
        let tenApodArray = tenApodJSON.tenApodArray;
        return tenApodArray;
      })
    );
  }

  getMissionManifest(roverName: string){
    return this.http.get(`/api/missionManifest/${roverName}`);
  }

  getPageOfPhotosOfSol(roverName: string, sol, pageNum){
    return this.http.get(`/api/marsPhotos/${roverName}/${sol}/${pageNum}`);
  }
}
