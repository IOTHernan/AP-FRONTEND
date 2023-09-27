import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CheMediaService {
constructor(private http: HttpClient) {}

getMedia(): Observable<any> {
  console.log('getMedia');
  return this.http.get('./../../assets/data/media.json');
}

}
