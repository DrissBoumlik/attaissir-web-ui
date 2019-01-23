import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Card } from '../../../shared/classes/card';

@Injectable({
    providedIn: 'root'
})
export class CardsService {
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
    getCards(): Observable<Card[]> {
        return this.http.get<Card[]>(`${environment.apiUrl}/${this.routeName}`);
    }

    /**
     * Get a collection of Cards
     * @returns {Observable<Card[]>}
     */
    getCardsDx(params: any): Observable<Card[]> {
        return this.http.post<Card[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    /**
     * Get a Card
     * @param id
     * @returns {Observable<Card[]>}
     */
    getCard(id: number): Observable<Card> {
        return this.http.get<Card>(`${environment.apiUrl}/${this.routeName}/${id}`);
    }

    /**
     * Add a Card
     * @param Card
     * @returns {Observable<Card[]>}
     */
    addCard(card: Card): Observable<Card[]> {
        return this.http.post<Card[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(card), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getDoc(id: number): Observable<Card[]> {
        return this.http.get<Card[]>(`${environment.apiUrl}/agreements/${id}/prints`);
    }

    /**
     * Edit a Card
     * @param number
     * @param string
     * @returns {Observable<Card>}
     */
    editCard(id: number, action: string): Observable<Card> {
        return this.http.put<Card>(`${environment.apiUrl}/${this.routeName}/${id}/${action}`, JSON.stringify({}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'charset': 'UTF-8'
            }
            )
        });
    }

    massCards(card: any, action: string): Observable<Card> {
        return this.http.put<Card>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify({
            bulk: {
                name: action,
                ids: card
            }
        }), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            });
    }

    /**
     * Delete a Card
     * @param id  the id of the Card intended to delete
     * @returns {Observable<any>}
     */
    deleteCard(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getCardByRFID(rfid: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/find?rfid=${rfid}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
