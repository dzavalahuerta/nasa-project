import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

function httpOptions(){
  return {headers: new HttpHeaders({'Authorization': localStorage.getItem('JWT_TOKEN')})};
}

// const httpOptions = 
// {
//   headers: new HttpHeaders({
//     'Authorization': localStorage.getItem('JWT_TOKEN')
//   })
// };

@Injectable()
export class NasaApiService {

  constructor(private http: HttpClient) { }

  getTenApodJSON(date){
    return this.http.get(`/api/10apod/${date}`, httpOptions()).pipe(
      map((tenApodJSON: {tenApodArray: []})=>{
        let tenApodArray = tenApodJSON.tenApodArray;
        return tenApodArray;
      })
    );
  }

  getMissionManifest(roverName: string){
    return this.http.get(`/api/missionManifest/${roverName}`, httpOptions());
  }

  getPageOfPhotosOfSol(roverName: string, sol, pageNum){
    return this.http.get(`/api/marsPhotos/${roverName}/${sol}/${pageNum}`, httpOptions());
  }
}
