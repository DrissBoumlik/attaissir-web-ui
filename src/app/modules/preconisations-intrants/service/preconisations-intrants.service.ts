import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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


  getPreconisation(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

}
