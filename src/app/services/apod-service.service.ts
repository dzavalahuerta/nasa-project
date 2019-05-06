import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApodServiceService {

  constructor(private http: HttpClient) { }

  getTenApodJSON(){
    return this.http.get('/api/10apod').pipe(
      map((tenApodJSON: {tenApodArray: []})=>{
        let tenApodArray = tenApodJSON.tenApodArray;
        return tenApodArray;
      })
    );
  }
}
