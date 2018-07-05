import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Third } from '../shared/classes/third';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {

  routeName: string;

  header1: any;
  constructor(private http: HttpClient) {
    this.header1 = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAll(route: string): Observable<Third[]> {
    return this.http.get<Third[]>(`${environment.apiUrl}/${this.routeName}/route`);
  }


  delete(id: any, route: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${route}/${id}`, {
      headers: this.header1
    });
  }


  post(params?: any, route?: string): Observable<Third[]> {
    return this.http.post<Third[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: this.header1
    });
  }


  getById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/document-types/${id}`);
  }





  /**
   * Get a Third parties
   * @param cin
   * @returns {Observable<Third[]>}
   */
  getByData(cin: string): Observable<Third> {
    return this.http.get<Third>(`${environment.apiUrl}/${this.routeName}/find?v=${cin}`);
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
    return this.http.post<Third[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
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
   * @param isEdit
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
    return this.http.get<Third>(`${environment.apiUrl}/${this.routeName}/find?v=${cin}`);
  }

  /**
   * Add a third party
   * @param third
   * @returns {Observable<Third[]>}
   */
  addThird(third: Third): Observable<Third[]> {
    return this.http.post<Third[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(third), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Edit a third party
   * @param third
   * @returns {Observable<Third>}
   */
  editThird(third: Third): Observable<Third> {
    return this.http.put<Third>(`${environment.apiUrl}/${this.routeName}/${third.id}`, JSON.stringify(third), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Delete a third party
   * @param id  the id of the third party intended to delete
   * @returns {Observable<any>}
   */
  deleteThird = (id: number): Observable<any> => {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
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
    return this.http.delete(`${environment.apiUrl}/bank-accounts/${idBankAccount}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   *
   * @returns {Observable<any>}
   * @param data
   */
  addBankAccount(data: { rib: string, bank: string, third_party_id: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bank-accounts`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   *
   * @returns {Observable<Object>}
   * @param newBA
   * @param id
   */
  updateBankAccount(newBA: { rib: string, bank: string, third_party_id: number }, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/bank-accounts/${id}`, newBA, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /*loadDocuments(idThird: number): any {
    return this.http.get(`${environment.apiUrl}/documents/${idThird}`);
  }
*/

  getDocTypes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/documents/vars`);
  }

  addDocument(file: File, type: string, contract_id?: string, third_id?: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document', file, file.name);
    formData.append('type', type);
    formData.append('third_party_id', third_id);
    if (contract_id) {
      formData.append('contract_id', contract_id);
    }
    return this.http
      .post(`${environment.apiUrl}/documents`, formData);
  }

  putDocumentInfo(docInfo: any, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/documents/${id}`,
      docInfo, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  /**
   *
   * @param {number} id
   * @returns {Observale<ant>}
   */
  getDocType(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/document-types/${id}`);
  }

}
