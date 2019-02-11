import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Feature} from 'geojson';
import * as geojson from 'geojson';

@Injectable({
    providedIn: 'root'
})
export class GpsService {
    routeName: string;

    constructor(private http: HttpClient) {
        this.routeName = 'tracking';
    }


    /**
     * @returns {Observable<any>}
     */
    getTrackerList(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/trackers/list`);
    }

    /**
     * @returns {Observable<any>}
     */
    getTrackersPosition(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/trackers/position`, JSON.stringify({trackers: params}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     *
     * @param tracker_id
     */
    getTrackerHistory(tracker_id: Number, codeAction: string) {
        const params = new HttpParams()
            .append('code', codeAction);
        return this.http.get(`${environment.apiUrl}/${this.routeName}/history/${tracker_id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: params
        });
    }

    addHarvestPolygon(feature: Feature<geojson.Polygon | geojson.MultiPolygon, any>): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/add/polygon`, JSON.stringify({geom: feature}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
