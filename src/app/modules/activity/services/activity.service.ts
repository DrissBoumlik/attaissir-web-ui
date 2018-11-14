import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../../../shared/classes/article';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'activities';
  }



  /**
   * Get a collection of Article
   * @returns {Observable<any[]>}
   */
  getActivitiesDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  /**
   * Delete a user
   * @param id  the id of the activity intended to delete
   * @returns {Observable<any>}
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  



}
