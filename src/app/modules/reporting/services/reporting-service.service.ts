import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {

    routeName = 'report';

    constructor(private http: HttpClient) {
    }

    /**
     *
     * @param params
     * @returns {Observable<any>}
     */
    getContractsDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/contracts/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     *
     * @param params
     */
    getHourlyReceptionStateDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/reception/hourly/cane/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     *
     * @param params
     * @returns {Observable<any>}
     */
    getCardsDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/cards/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getVarsByZone(zone_id: number): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/vars`, JSON.stringify({zone_id: zone_id}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     * @param params
     * @returns {Observable<any>}
     */
    getIlosDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/ilots/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     *
     * @param title
     * @param params
     */
    getReportDataDx(url: string, params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${url}`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getHourlyReceptionStateCx(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/reception/hourly/cane/chart`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
