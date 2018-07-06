import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Article} from '../../../shared/classes/article';

@Injectable({
  providedIn: 'root'
})
export class MouvementsService {

  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'stock';
  }


  getListeDemandesDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  /**
   * Get a Mouvement
   * @returns {Observable<Article>}
   */
  getMouvement(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }


  /**
   * Delete a third party
   * @param id  the id of the mouvement intended to delete
   * @returns {Observable<any>}
   */
  deleteMouvement = (id: number): Observable<any> => {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Delete a third party
   * @param id  the id of the mouvement intended to delete
   * @returns {Observable<any>}
   */
  deliverMouvement = (id: number): Observable<any> => {
    return this.http.get(`${environment.apiUrl}/${this.routeName}/'deliver'/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
