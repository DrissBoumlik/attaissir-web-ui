import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
import {Warehouse} from '../../../shared/classes/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  routeName = 'warehouses';

  constructor(private http: HttpClient) {
  }


  /*getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/incidents`);
  }*/

  getWarehousesDx(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  editIncident(id: number, warehouse: Warehouse): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.routeName}/${id}`, warehouse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteWarehouse(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addIncident(warehouse: Warehouse): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}`, warehouse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
