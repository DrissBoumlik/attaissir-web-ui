import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Article} from '../../../shared/classes/article';

@Injectable({
  providedIn: 'root'
})
export class PreconisationsIntrantsService {


  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'interventionrequests';
  }



  getListeDemandesDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }




  getListeAyants_droits(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/'ayants-droits'`);
 }



  getPreconisation(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }


  cancelPreconisation(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getArticlesDx(params?: any): Observable<Article[]> {
    return this.http.post<Article[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
