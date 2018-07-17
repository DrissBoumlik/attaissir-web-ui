import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };


  constructor(private http: HttpClient/*,
              public jwtHelper: JwtHelperService*/) {
  }

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/login`, JSON.stringify({ email: email.toLowerCase(), password: password }), this.options);
  }

  refresh = () => {
    return this.http.get(`${environment.apiUrl}/refresh`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getToken = () => {
    return JSON.parse(localStorage.getItem('currentUser')).data.token;
  }

  getTanent = () => {
    return JSON.parse(localStorage.getItem('tenantId'));
  }
}
