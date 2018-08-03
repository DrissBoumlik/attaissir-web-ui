import { Injectable } from '@angular/core';
import {Observable} from '../../../../../node_modules/rxjs/Rx';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  data: any;
  roleID: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.roleID = params.id );
  }

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

  getRoles(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles/grid`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  getRole(roleID: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/roles/${roleID}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getUserPermissions(roleID: number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/roles/${roleID}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateRole(data,roleID: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/roles/${roleID}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getRolesDx(params?: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/roles/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
