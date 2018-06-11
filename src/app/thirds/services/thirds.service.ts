import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Third } from '../../classes/third';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThirdsService {

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
   * Get a collection of Third parties variables to be used in dropdowns in third parties forms
   * @returns {Observable<Third[]>}
   */
  getThirdsVars(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/vars`);
  }

  /**
   * Get a collection of Third parties
   * @returns {Observable<Third[]>}
   */
  getThirdsDx(params?: any): Observable<Third[]> {
    return this.http.post<Third[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params));
  }

  /**
   * Get a collection of any parties
   * @returns {Observable<any[]>}
   */
  getStats(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/contracts/kpi`);
  }


  /**
   * Get a Third parties
   * @param id
   * @returns {Observable<Third[]>}
   */
  getThird(id: number, isEdit?: boolean): Observable<Third> {
    const edit = (isEdit) ? '?edit' : '';
    return this.http.get<Third>(`${environment.apiUrl}/${this.routeName}/${id}${edit}`);
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
    return this.http.post<Third[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(third));
  }

  /**
   * Edit a third party
   * @param third
   * @returns {Observable<Third>}
   */
  editThird(third: Third): Observable<Third> {
    return this.http.put<Third>(`${environment.apiUrl}/${this.routeName}/${third.id}`, JSON.stringify(third));
  }

  /**
   * Delete a third party
   * @param id  the id of the third party intended to delete
   * @returns {Observable<any>}
   */
  deleteThird = (id: number): Observable<any> => {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`);
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
    return this.http.delete(`${environment.apiUrl}/bank-accounts/${idBankAccount}`);
  }

  /**
   *
   * @returns {Observable<any>}
   * @param data
   */
  addBankAccount(data: { rib: string, bank: string, third_party_id: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bank-accounts`, data);
  }

  /**
   *
   * @returns {Observable<Object>}
   * @param newBA
   * @param id
   */
  updateBankAccount(newBA: { rib: string, bank: string, third_party_id: number }, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/bank-accounts/${id}`, newBA);
  }

  /*loadDocuments(idThird: number): any {
    return this.http.get(`${environment.apiUrl}/documents/${idThird}`);
  }
*/

  getDocTypes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/documents/vars`);
  }

  addDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document', file, file.name);
    return this.http
      .post(`${environment.apiUrl}/documents`, formData, {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})});
  }

  putDocumentInfo(docInfo: any, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/documents/${id}`,
      docInfo);
  }

  /**
   *
   * @param {number} id
   * @returns {Observale<ant>}
   */
  getDocType(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/document-types/${id}`);
  }

  /**
   *
   * @param {number} idDocument
   * @returns {Observable<any>}
   */
  deleteDocument(idDocument: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/documents/${idDocument}`);
  }
}
