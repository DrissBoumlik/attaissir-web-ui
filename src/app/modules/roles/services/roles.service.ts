import { Injectable } from '@angular/core';
import {Observable} from '../../../../../node_modules/rxjs/Rx';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  saveRole(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getPermissions(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/permissions/grid`, JSON.stringify([]), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
