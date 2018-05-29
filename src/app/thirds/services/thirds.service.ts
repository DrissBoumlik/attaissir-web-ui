import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Third } from '../classes/third';
import { } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThirdsService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  fake: string;

  constructor(private http: HttpClient) {
    this.fake = (true) ? 'comments' : 'thirds';
  }

  /**
   * Get a collection of Third parties
   * @returns {Observable<Third[]>}
   */
  getThirds(): Observable<Third[]> {
    return this.http.get<Third[]>(`${environment.apiUrl}/${this.fake}`);
  }

  /**
   * Get a Third parties
   * @param id
   * @returns {Observable<Third[]>}
   */
  getThird(id: number): Observable<Third> {
    return this.http.get<Third>(`${environment.apiUrl}/${this.fake}/${id}`);
  }

  /**
   * Add a third party
   * @param third
   * @returns {Observable<Third[]>}
   */
  addThird(third: Third): Observable<Third[]> {
    return this.http.post<Third[]>(`${environment.apiUrl}/${this.fake}`, JSON.stringify(third), this.options);
  }

  /**
   * Edit a third party
   * @param third
   * @returns {Observable<Third>}
   */
  editThird(third: Third): Observable<Third> {
    return this.http.put<Third>(`${environment.apiUrl}/${this.fake}/${third.id}`, JSON.stringify(third), this.options);
  }

  /**
   * Delete a third party
   * @param id  the id of the third party intended to delete
   * @returns {Observable<any>}
   */
  deleteThird(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.fake}/${id}`, this.options);
  }

  /**
   * Format data depending of API
   * @param data
   * @param test
   * @returns {any}
   */
  faker(data, test) {
    return (!test) ? data[0]['data'] : data;
  }
}
