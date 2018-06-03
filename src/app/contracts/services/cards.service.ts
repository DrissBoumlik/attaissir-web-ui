import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Card} from '../classes/card';

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
    return this.http.post<Card[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(card), this.options);
  }

  /**
   * Edit a Card
   * @param Card
   * @returns {Observable<Card>}
   */
  editCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${environment.apiUrl}/${this.routeName}/${card.id}`, JSON.stringify(card), this.options);
  }

  /**
   * Delete a Card
   * @param id  the id of the Card intended to delete
   * @returns {Observable<any>}
   */
  deleteCard(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, this.options);
  }

  /**
   * Format data depending of API
   * @param dat
   * @param test
   * @returns {any}
   */
  dataFormatter(dat, test) {
    return (!test) ? dat['data'] : dat;
  }
}
