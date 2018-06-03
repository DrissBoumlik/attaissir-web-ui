import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AgreementGround } from '../classes/agreement-ground';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgreementGroundsService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  routeName: string;
  constructor(public http: HttpClient) {
    this.routeName = 'agreement_ground';
  }

  /**
   * Get a collection of AgreementGrounds
   * @returns {Observable<AgreementGround[]>}
   */
  getAgreementGrounds(): Observable<AgreementGround[]> {
    return this.http.get<AgreementGround[]>(`${environment.apiUrl}/${this.routeName}`);
  }


  /**
   * Get a AgreementGround
   * @param id
   * @returns {Observable<AgreementGround[]>}
   */
  getAgreementGround(id: number): Observable<AgreementGround> {
    return this.http.get<AgreementGround>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Add a AgreementGround
   * @param AgreementGround
   * @returns {Observable<AgreementGround[]>}
   */
  addAgreementGround(agreementGround: AgreementGround): Observable<AgreementGround[]> {
    return this.http.post<AgreementGround[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(agreementGround), this.options);
  }


  /**
   * Edit a AgreementGround
   * @param AgreementGround
   * @returns {Observable<AgreementGround>}
   */
  editAgreementGround(agreementGround: AgreementGround): Observable<AgreementGround> {
    return this.http.put<AgreementGround>(`${environment.apiUrl}/${this.routeName}/${agreementGround.id}`,
      JSON.stringify(agreementGround), this.options);
  }

  /**
   * Delete a AgreementGround
   * @param id  the id of the AgreementGround intended to delete
   * @returns {Observable<any>}
   */
  deleteAgreementGround(id: number): Observable<any> {
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
