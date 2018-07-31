import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Article } from '../../../shared/classes/article';

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




  getListeAyants_droits(contract_id): Observable<any> {
    return this.http.post<any[]>(`${environment.apiUrl}/${this.routeName}/rightholders/grid`,
      JSON.stringify({ contract_id: contract_id }), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }



  getPreconisation(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/stockoperation/${id}`);
  }


  cancelPreconisation(id: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/cancelpreconization`, JSON.stringify({ id: id }), {
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



  deliver(id: number, pin: any, rf_code: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/deliverpreconization`,
      JSON.stringify({ id: id, pin: pin, rfid: rf_code }), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }



}
