import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  routeName = 'report';

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param params
   * @returns {Observable<any>}
   */
  getContractsDx(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/contracts/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   *
   * @param params
   * @returns {Observable<any>}
   */
  getCardsDx(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/cards/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getVarsByZone(zone_id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/vars`, JSON.stringify({zone_id: zone_id}), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
