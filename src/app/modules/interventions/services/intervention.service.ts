import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClientTestingBackend } from '@angular/common/http/testing/src/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  routeName = 'categoriesdivision';

  constructor(private http: HttpClient) { }

  getFamiliesAndSubFamilies(): Observable<any> {
    const division = localStorage.getItem('tenantId');
    return this.http.get(`${environment.apiUrl}/${this.routeName}/5`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



}
