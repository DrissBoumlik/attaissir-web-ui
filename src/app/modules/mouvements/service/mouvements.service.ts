import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Article } from '../../../shared/classes/article';
import { Third } from '../../../shared/classes/third';

@Injectable({
    providedIn: 'root'
})
export class MouvementsService {

    routeName: string;

    constructor(private http: HttpClient) {
        this.routeName = 'stocks';
    }

    getListeDemandesDx(params?: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
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
    getListeMouvementDetailsDx(params?: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/mouvement/details`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     * Get a Mouvement
     * @returns {Observable<Article>}
     */
    getMouvement(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);
    }

    /**
     * Add a Mouvement
     * @param third
     * @returns {Observable<Third[]>}
     */
    addMouvement(mouvement: any): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(mouvement), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }


    /**
     * Add a Mouvement
     * @param third
     * @returns {Observable<Third[]>}
     */
    addReturn(mouvement: any): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiUrl}/stocks/return`, JSON.stringify(mouvement), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    deleteMouvement = (id: number): Observable<any> => {
        return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }


    editMouvement(mouvement: any): Observable<any> {
        console.log('put');
        return this.http.put<any>(`${environment.apiUrl}/${this.routeName}/${mouvement.id}`, JSON.stringify(mouvement), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getMouvementVars(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/vars`);
    }

    /**
     * Delete a third party
     * @param id  the id of the mouvement intended to delete
     * @returns {Observable<any>}
     */
    deliverMouvement = (id: number): Observable<any> => {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/'deliver'/${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }



    changeStatus(id: number, rf_code: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/change_status`,
            JSON.stringify({ id: id, rfid: rf_code }), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            });
    }

}
