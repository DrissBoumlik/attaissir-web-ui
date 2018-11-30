import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArrachageService {
  routeName = 'harvest';

  constructor(private http: HttpClient) {
  }

  getConvocationsDx(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/convocations/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getEchontillonsDx(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/echantillons/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getInterventionById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.routeName}/interventions/${id}`);
  }

  saveAnalyse(analyse_data: any, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.routeName}/interventions/${id}`, JSON.stringify({ analyse: analyse_data }), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  printConvocation(idConvocation: number) {
    return window.open(`${environment.apiUrl}/${this.routeName}/convocations/print/${idConvocation}`);
  }

  getChargementListDx(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/chargements/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getChargementById(idChargement): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.routeName}/chargements/${idChargement}`);
  }
}
