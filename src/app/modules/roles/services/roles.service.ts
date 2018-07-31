import { Injectable } from '@angular/core';
import {Observable} from '../../../../../node_modules/rxjs/Rx';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

let permissions = [
  {
    permission:"permission1",
    actions:
    [
      ["lire",false,'permissions1.lire'],
      ["ecrire",false]
    ]
  },
  {
    permission:"permission2",
    actions:[
      ["lire",false],
      ["ecrire",false]
    ]
  },
  {
    permission:"permission3",
    actions:[
      ["lire",false],
      ["ecrire",false]
    ]
  }

];

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  data: any;
  constructor(private http: HttpClient) { }

  saveRole(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getPermissions(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/permissions-with-group `, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // getPermissions(data): Observable<any>{
  //   return this.http.get(`${environment.apiUrl}/permissions-with-group `, JSON.stringify(data), {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   });
  // }
}
