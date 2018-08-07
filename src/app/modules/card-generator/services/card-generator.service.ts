import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardGeneratorService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  routeName: string;
  constructor(public http: HttpClient) {
    this.routeName = 'cards';
  }


  /**
   * Get a collection of Cards
   * @returns {Observable<Card[]>}
   */





  getCards(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/generator-list`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }




  export(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/export`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  validate(params?: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.routeName}/assign-rfid`, JSON.stringify( {"cards": params }), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }






}
