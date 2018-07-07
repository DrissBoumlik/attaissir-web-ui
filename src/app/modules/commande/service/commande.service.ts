import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  routeName = 'orders';

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

  getCommande(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);

  }

  /**
   * Add a contracts
   * @param Commande
   * @returns {Observable<Commande[]>}
   */
  addCommande(contract: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(contract), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

  /**
   * Edit a contracts

   * @param Commande
   * @returns {Observable<Commande>}
   */
  editCommande(contract: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${this.routeName}/${contract.id}`, JSON.stringify(contract), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

  /**
   * Delete a contracts
   * @param id  the id of the contracts intended to delete
   * @returns {Observable<any>}
   */
  deleteCommande(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
