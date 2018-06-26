import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Incident} from '../classes/Incident';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class IncidentService {

  routeName = 'incident';

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/incidents`);
  }

  editIncident(id: number, incident: Incident): Observable<any> {
      return this.http.put(`${environment.apiUrl}/${this.routeName}/${id}`, incident,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  deleteIncident(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addIncident(incident: Incident): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}`, incident,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
