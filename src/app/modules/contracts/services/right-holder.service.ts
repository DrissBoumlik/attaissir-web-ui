import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RightHolderService {

  routeName = 'rightholders';

  constructor(private http: HttpClient) {
  }


  /**
   * Get a collection of Right holders
   * @returns {Observable<Third[]>}
   */
  getAllDx(contract_id: any): Observable<any[]> {

    console.log({ contract_id: contract_id });

    return this.http.post<any[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify({ contract_id: contract_id }), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getRightHolder(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);

  }

  /**
   * Add a contracts
   * @param rightHolder
   * @returns {Observable<rightHolder[]>}
   */
  addRightHolder(rightHolder: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(rightHolder), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Edit a rightHolder

   * @param rightHolder , contract id
   * @returns {Observable<rightHolder>}
   */
  editRightHolder(id: any, rightHolder: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${this.routeName}/${id}`, JSON.stringify(rightHolder), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

  /**
   * Delete a contracts
   * @param id  the id of the RightHolder intended to delete
   * @returns {Observable<any>}
   */
  deleteRightHolder(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
