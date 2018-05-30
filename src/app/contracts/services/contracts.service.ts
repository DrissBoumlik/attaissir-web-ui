import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contract} from '../classes/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  routeName: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  constructor(public http: HttpClient) {
    this.routeName = 'contracts';
  }

  /**
   * Get a collection of Contracts
   * @returns {Observable<Contract[]>}
   */
  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a Contracts
   * @param id
   * @returns {Observable<Contract[]>}
   */
  getContract(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${environment.apiUrl}/${this.routeName}/${id}`);

  }

  /**
   * Add a contracts
   * @param Contract
   * @returns {Observable<Contract[]>}
   */
  addContract(contract: Contract): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(contract), this.options);

  }

  /**
   * Edit a contracts

   * @param Contract
   * @returns {Observable<Contract>}
   */
  editContract(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${environment.apiUrl}/${this.routeName}/${contract.id}`, JSON.stringify(contract), this.options);

  }

  /**
   * Delete a contracts
   * @param id  the id of the contracts intended to delete
   * @returns {Observable<any>}
   */
  deleteContract(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, this.options);
  }

  /**
   * Format data depending of API
   * @param data
   * @param test
   * @returns {any}
   */
  dataFormatter(data, test) {
    return (!test) ? data[0]['data'] : data;
  }

  /**
   *
   * @returns {any}
   */
  getAllContracts(): any {
    //
    // return this.http.get(`${environment.apiUrl}/contracts`);
    return [];
  }
}
