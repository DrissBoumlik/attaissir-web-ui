import { Injectable } from '@angular/core';
import { Third } from '../../../shared/classes/third';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isNull } from 'util';


@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  routeName: string;


  constructor(private http: HttpClient) {
    this.routeName = 'orders';

  }

  getListeDemandesDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getStatusColor(value: string): string {
    console.log(value);
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'recive'.toLowerCase() || value.toLowerCase() === 'Recive'.toLowerCase()) {
      return 'm-badge m-badge--primary m-badge--wide';
    } else if (value.toLowerCase() === 'delivery'.toLowerCase() || value.toLowerCase() === 'Delivery'.toLowerCase()) {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'transfer'.toLowerCase() || value.toLowerCase() === 'Transfer'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }


  /**
   * Get a Mouvement
   * @returns {Observable<Article>}
   */
  getOrder(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

}
