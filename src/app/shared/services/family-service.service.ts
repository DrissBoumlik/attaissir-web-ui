import { Injectable } from '@angular/core';
import { Third } from '../classes/third';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'articlecategories';
  }

  /**
   * @returns {Observable<any>}
   */
  getFamilies(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getSubFamilies(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.routeName}/type/${id}`);
  }

  getKpiData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/zones/kpis`);
  }

  /**
   *
   * @returns {Observable<any>}
   */
  getCdaData(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/zones/kpis/cda/${id}`);
  }

}
