import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Warehouse } from '../../../shared/classes/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {


  routeName = 'warehouses';

  constructor(private http: HttpClient) {
  }

  getWarehousesDx(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getWarehousesByZone(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.routeName}/zone/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Get a collection of Warehouse
   * * @returns {Observable<Warehouse[]>}
   */
  getAllDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   * @returns {Observable<any>}
   */
  getAllWithUsines(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.routeName}/getAll`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Get a collection of Warehouse
   * * @returns {Observable<Warehouse[]>}
   */
  getByUserAndStructure(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/warehouses/byuserandstructure`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getWarehouse(id: number, isEdit?: boolean): Observable<any> {
    const edit = (isEdit) ? '?edit' : '';
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}${edit}`);
  }

  /**
   * Add a warehouse
   * * @param warehouse
   * @returns {Observable<Warehouse[]>}
   */
  addWarehouse(item: any): Observable<Warehouse[]> {
    return this.http.post<Warehouse[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(item), {
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


  /**
   * Edit a warehouse
   * @param warehouse
   * @returns {Observable<Warehouse>}
   */
  editWarehouse(item: any): Observable<any> {
    console.log('put');
    return this.http.put<any>(`${environment.apiUrl}/${this.routeName}/${item.id}`, JSON.stringify(item), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
