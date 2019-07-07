import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Incident } from '../../../shared/classes/Incident';

@Injectable({
    providedIn: 'root'
})
export class IncidentService {

    routeName = 'incidents';

    constructor(private http: HttpClient) {
    }


    /*getAll(): Observable<any> {
      return this.http.get(`${environment.apiUrl}/incidents`);
    }*/

    getIncidentsDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getTodosDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/todos/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getFieldStatesDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/fieldstates/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    editIncident(id: number, incident: Incident): Observable<any> {
        return this.http.put(`${environment.apiUrl}/${this.routeName}/${id}`, incident, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    deleteIncident(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    addIncident(incident: Incident): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}`, incident, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

}
