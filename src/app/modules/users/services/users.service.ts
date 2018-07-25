import {Injectable} from '@angular/core';
import {Observable} from '../../../../../node_modules/rxjs/Rx';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  saveUser(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getStructures(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/structures/grid`, JSON.stringify([]), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getRoles(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles/grid`, JSON.stringify([]), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
