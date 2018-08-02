import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcel } from '../../../shared/classes/parcel';
import { Contract } from '../../../shared/classes/contract';

@Injectable({
  providedIn: 'root'
})
export class ParcelsService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  routeName: string;
  constructor(public http: HttpClient) {
    this.routeName = 'parcels';
  }

  /**
   * Get a collection of Parcels
   * @param {string} params
   * @returns {Observable<Parcel[]>}
   */
  getParcels(params?: string): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`${environment.apiUrl}/${this.routeName}${params}`);
  }

  /**
   * Get a Parcel
   * @param id
   * @returns {Observable<Parcel[]>}
   */
  getParcel(id: number): Observable<Parcel> {
    return this.http.get<Parcel>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Add a Parcel
   * @param Parcel
   * @returns {Observable<Parcel[]>}
   */
  addParcel(parcel: any): Observable<Parcel[]> {
    return this.http.post<Parcel[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(parcel), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addParcelLogical(parcel: any): Observable<Parcel[]> {
    return this.http.post<Parcel[]>(`${environment.apiUrl}/${this.routeName}/logical`, JSON.stringify(parcel), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getParcelsDx(params: any): Observable<Parcel[]> {
    return this.http.post<Parcel[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Edit a Parcel
   * @param Parcel
   * @returns {Observable<Parcel>}
   */
  editParcel(parcel: any): Observable<Parcel> {
    return this.http.put<Parcel>(`${environment.apiUrl}/${this.routeName}/${parcel.id}`,
      JSON.stringify(parcel), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  /**
   * Delete a Parcel
   * @param id  the id of the Parcel intended to delete
   * @returns {Observable<any>}
   */
  deleteParcel(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
