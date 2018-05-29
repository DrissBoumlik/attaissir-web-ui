import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  routeName: string;

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
}
