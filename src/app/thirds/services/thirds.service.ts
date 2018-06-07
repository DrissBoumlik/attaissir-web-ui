import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Third } from '../classes/third';
import { } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Document } from '../classes/document';

@Injectable({
  providedIn: 'root'
})
export class ThirdsService {

  public headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'third-parties';
  }


  /**
   * Get a collection of Third parties
   * @returns {Observable<Third[]>}
   */
  getThirds(): Observable<Third[]> {
    return this.http.get<Third[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a collection of any parties
   * @returns {Observable<any[]>}
   */
  getStats(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/agreements/kpi`);
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

  /**
   *
   * @param {number} idBankAccount
   * @returns {Observable<any>}
   */
  deleteBankAccount(idBankAccount: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/bank-accounts/${idBankAccount}`, this.options);
  }

  /**
   *
   * @returns {Observable<any>}
   * @param data
   */
  addBankAccount(data: { rib: string, bank: string, third_party_id: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bank-accounts`, data, this.options);
  }

  /**
   *
   * @returns {Observable<Object>}
   * @param newBA
   * @param id
   */
  updateBankAccount(newBA: { rib: string, bank: string, third_party_id: number }, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/bank-accounts/${id}`, newBA, this.options);
  }

  /*loadDocuments(idThird: number): any {
    return this.http.get(`${environment.apiUrl}/documents/${idThird}`, this.options);
  }
*/

  getDocTypes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/document-types/`, this.options);
  }

  addDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document', file, file.name);
    return this.http
      .post(`${environment.apiUrl}/documents`, formData);
  }

  putDocumentInfo(docInfo: any, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/documents/${id}`,
      docInfo, this.options);
  }

  /**
   *
   * @param {number} id
   * @returns {Observale<ant>}
   */
  getDocType(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/document-types/${id}`, this.options);
  }

  /**
   *
   * @param {number} idDocument
   * @returns {Observable<any>}
   */
  deleteDocument(idDocument: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/documents/${idDocument}`, this.options);
  }
}
