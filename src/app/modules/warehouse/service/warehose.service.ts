import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {Third} from '../../../shared/classes/third';
import {Warehouse} from '../../../shared/classes/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehoseService {


  routeName = 'warehouses';

  constructor(private http: HttpClient) {
  }


  /**
   * Get a collection of Third parties
   * @returns {Observable<Third[]>}
   */
  getAllDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getWarehouse(id: number, isEdit?: boolean): Observable<Third> {
    const edit = (isEdit) ? '?edit' : '';
    return this.http.get<Third>(`${environment.apiUrl}/${this.routeName}/${id}${edit}`);
  }


  /**
   * Add a third party
   * @param third
   * @returns {Observable<Third[]>}
   */
  addWarehouse(third: Third): Observable<Warehouse[]> {
    return this.http.post<Warehouse[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(third), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**warehouses
   * @param id
   * @returns {Observable<any>}
   */
  deleteWarehouse(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
