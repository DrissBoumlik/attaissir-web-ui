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

  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = (environment.apiUrl === 'http://json.code.go') ? 'comments' : 'third-parties';
  }



  /**
   * Get a collection of Third parties
   * @returns {Observable<Third[]>}
   */
  getThirds(): Observable<Third[]> {
    return this.http.get<Third[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a Third parties
   * @param id
   * @returns {Observable<Third[]>}
   */
  getThird(id: number): Observable<Third> {
    return this.http.get<Third>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Get a Third parties
   * @param cin
   * @returns {Observable<Third[]>}
   */
  getThirdByCIN(cin: string): Observable<Third> {
    return this.http.get<Third>(`${environment.apiUrl}/${this.routeName}/?cin=${cin}`);
  }

  /**
   * Add a third party
   * @param third
   * @returns {Observable<Third[]>}
   */
  addThird(third: Third): Observable<Third[]> {
    console.log(third);
    return this.http.post<Third[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(third), this.options);
  }

  /**
   * Edit a third party
   * @param third
   * @returns {Observable<Third>}
   */
  editThird(third: Third): Observable<Third> {
    return this.http.put<Third>(`${environment.apiUrl}/${this.routeName}/${third.id}`, JSON.stringify(third), this.options);
  }

  /**
   * Delete a third party
   * @param id  the id of the third party intended to delete
   * @returns {Observable<any>}
   */
  deleteThird = (id: number): Observable<any> => {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, this.options);
  }

  /**
   * Format data depending of API
   * @param {any} dat
   * @param {boolean} test
   * @returns {Third[]}
   */
  dataFormatter = (dat: any, test: boolean) => {
    return (!test) ? dat['data'] : dat;
  }
}
