
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };
  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'widget';
  }



  getAll(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  getList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/list`);
  }


  getCompaniesList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/companies`);
  }

  getDivisionList(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/divisions/${id}`);
  }


  getCdasList(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/cdas/${id}`);
  }

  getZonesList(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/zones/${id}`);
  }


  getCdList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/cd`);
  }

  getFamilleList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/famille`);
  }


  
  changeWidgetFilter(item: any, id: any): Observable<any>  {

    return this.http.post(`${environment.apiUrl}/${this.routeName}/filter/${id}`, JSON.stringify({filter : item }), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }


  createWidget(item: any): Observable<any>  {

    return this.http.post(`${environment.apiUrl}/${this.routeName}/new`, JSON.stringify(item), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }


  deleteWidget(id: any): Observable<any> {
    return this.http.delete<any[]>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }
  

  changePositionWidget(item: any): Observable<any>  {

    return this.http.post(`${environment.apiUrl}/${this.routeName}/position`, JSON.stringify(item), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }




  addFilterToAll(item: any): Observable<any>  {

    return this.http.post(`${environment.apiUrl}/${this.routeName}/add_filter_to_all`, JSON.stringify(item), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

}
