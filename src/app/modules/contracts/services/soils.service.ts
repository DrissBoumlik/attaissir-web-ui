import { Injectable } from '@angular/core';
import { Ground } from '../../../shared/classes/ground';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoilsService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  routeName: string;
  constructor(public http: HttpClient) {
    this.routeName = 'soils';
  }

  /**
   * Get a collection of Grounds
   * @returns {Observable<Ground[]>}
   */
  getGrounds(): Observable<Ground[]> {
    return this.http.get<Ground[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a Ground
   * @param id
   * @returns {Observable<Ground[]>}
   */
  getGround(id: number): Observable<Ground> {
    return this.http.get<Ground>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Add a Ground
   * @param Ground
   * @returns {Observable<Ground[]>}
   */
  addGround(ground: Ground): Observable<Ground[]> {
    return this.http.post<Ground[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(ground), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Edit a Ground
   * @param Ground
   * @returns {Observable<Ground>}
   */
  editGround(ground: Ground): Observable<Ground> {
    return this.http.put<Ground>(`${environment.apiUrl}/${this.routeName}/${ground.id}`, JSON.stringify(ground), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Delete a Ground
   * @param id  the id of the Ground intended to delete
   * @returns {Observable<any>}
   */
  deleteGround(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Format data depending of API
   * @param dat
   * @param test
   * @returns {any}
   */
  dataFormatter(dat, test) {
    return (!test) ? dat['data'] : dat;
  }
}
