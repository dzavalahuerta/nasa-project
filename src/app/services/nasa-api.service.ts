import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

function setAuthHeader(){
  return {headers: new HttpHeaders({'Authorization': localStorage.getItem('JWT_TOKEN')})};
}

@Injectable()
export class NasaApiService {

  constructor(private http: HttpClient) { }

  getTenApodJSON(date){
    return this.http.get(`/api/10apod/${date}`, setAuthHeader()).pipe(
      map((tenApodJSON: {tenApodArray: []})=>{
        let tenApodArray = tenApodJSON.tenApodArray;
        return tenApodArray;
      })
    );
  }

  getMissionManifest(roverName: string){
    return this.http.get(`/api/missionManifest/${roverName}`, setAuthHeader());
  }

  getPageOfPhotosOfSol(roverName: string, sol, pageNum){
    return this.http.get(`/api/marsPhotos/${roverName}/${sol}/${pageNum}`, setAuthHeader());
  }
}
