import {Injectable} from '@angular/core';
import {Zone} from '../../../shared/classes/zone';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ZonesService {
    private headers = new HttpHeaders({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = {
        headers: this.headers
    };

    routeName: string;

    constructor(public http: HttpClient) {
        this.routeName = 'zones';
    }

    /**
     * Get a collection of Zones
     * @returns {Observable<Zone[]>}
     */
    getZones(): Observable<Zone[]> {
        return this.http.get<Zone[]>(`${environment.apiUrl}/${this.routeName}-type`);
    }

    getCDAs(): Observable<Zone[]> {
        return this.http.get<Zone[]>(`${environment.apiUrl}/${this.routeName}-type?type=cda`);
    }

    getZonesByCDA(code: number): Observable<Zone[]> {
        return this.http.get<Zone[]>(`${environment.apiUrl}/${this.routeName}-type?type=zone&id=${code}`);
    }

    getSectors(code: number): Observable<Zone[]> {
        return this.http.get<Zone[]>(`${environment.apiUrl}/${this.routeName}-type?type=secteur&id=${code}`);
    }

    getBlocs(code: number): Observable<Zone[]> {
        return this.http.get<Zone[]>(`${environment.apiUrl}/${this.routeName}-type?type=bloc&id=${code}`);
    }

    /**
     * Get a Zone
     * @param id
     * @returns {Observable<Zone[]>}
     */
    getZone(id: number): Observable<Zone> {
        return this.http.get<Zone>(`${environment.apiUrl}/${this.routeName}/${id}`);
    }

    /**
     * Add a Zone
     * @param Zone
     * @returns {Observable<Zone[]>}
     */
    addZone(zone: Zone): Observable<Zone[]> {
        return this.http.post<Zone[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(zone), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     * Edit a Zone
     * @param Zone
     * @returns {Observable<Zone>}
     */
    editZone(zone: Zone): Observable<Zone> {
        return this.http.put<Zone>(`${environment.apiUrl}/${this.routeName}/${zone.id}`, JSON.stringify(zone), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     * Delete a Zone
     * @param id  the id of the Zone intended to delete
     * @returns {Observable<any>}
     */
    deleteZone(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getParcelByZone(zone_id: number | any | null | any[]) {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/${zone_id}/parcels`);
    }

    updateIlot(ilot_id: any, parcel_id: any) {
        return this.http.post(`${environment.apiUrl}/ilot/update`, JSON.stringify({ilot_id, parcel_id}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    deleteIlot(ilot_id: any) {
        return this.http.delete(`${environment.apiUrl}/ilots/${ilot_id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
