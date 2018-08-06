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

  getUserInfo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user-informations`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getUser(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  saveUser(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  editUser(data, id): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/${id}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getStructures(userId = -1): Observable<any> {
    if (userId === -1) {
      return this.http.get(`${environment.apiUrl}/structures-with-zones`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    return this.http.get(`${environment.apiUrl}/structures-with-zones/${userId}`, {
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

  getUsers(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/grid`, JSON.stringify([]), {
      headers: new HttpHeaders({
        // "tenant":"10"
      })
    });
  }
}
