import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApodServiceService {

  constructor(private http: HttpClient) { }

  getApodArray(){
    return this.http.get('/api').pipe(
      map((apodArray)=>{
        return apodArray;
      })
    );
  }
}
