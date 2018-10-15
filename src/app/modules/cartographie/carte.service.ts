import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  routeName = 'ilots';

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param params
   * @returns {Observable<any>}
   */
  getIlotByZone(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
