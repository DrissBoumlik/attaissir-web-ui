import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  routeName = 'commandes';

  constructor(private http: HttpClient) {
  }


  /**
   * Get a collection of Third parties
   * @returns {Observable<Third[]>}
   */
  getAllDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
