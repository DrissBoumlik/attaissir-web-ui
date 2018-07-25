import { Injectable } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';
import { HttpHeaders, HttpClient } from '../../../../../node_modules/@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

 

  getUsers(): Observable<any> {
    return this.http.post('http://s9.nmouline.code.go/users/grid', {
      headers: new HttpHeaders({
        // "tenant":"10"
      })
    });
  }
}
