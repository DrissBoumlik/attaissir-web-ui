import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../../../shared/classes/article';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'import';
  }

  /**
   * Get a collection of Article
   * @returns {Observable<Article[]>}
   */
  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}/type`);
  }


  upload(file: File, type: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('csv', file, file.name);
    formData.append('type', type);


    return this.http.post(`${environment.apiUrl}/${this.routeName}/upload`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
       // 'Content-Type': 'application/json'
      })
    });
  }



}
