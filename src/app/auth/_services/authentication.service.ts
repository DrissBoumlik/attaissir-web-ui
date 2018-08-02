import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };


  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/login`, JSON.stringify({ email: email.toLowerCase(), password: password }), this.options);
  }

  myPermission() {
    return this.http.get(`${environment.apiUrl}/my-permissions`, this.options);
  }

  refresh = () => {
    return this.http.get(`${environment.apiUrl}/refresh`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  getTanent = () => {
    return localStorage.getItem('tenantId');
  }
}
