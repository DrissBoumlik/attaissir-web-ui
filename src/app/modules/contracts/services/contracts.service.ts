
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contract } from '../../../shared/classes/contract';


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

  getContractsVars(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${environment.apiUrl}/${this.routeName}/vars`);
  }

  getContractsDx(params: any): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
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
    return this.http.post<Contract[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(contract), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

  /**
   * Edit a contracts

   * @param Contract
   * @returns {Observable<Contract>}
   */
  editContract(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${environment.apiUrl}/${this.routeName}/${contract.id}`, JSON.stringify(contract), {
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
  deleteContract(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  /**
   *
   * @param {number} id
   * @returns {Observable<any>}
   */
  getStrcutureById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/structures/${id}`);
  }

  /**
   *
   * @param {number} idContrat
   */
  activateContract(idContrat: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.routeName}/${idContrat}/activate`, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  printContract(idContract: number): any {
    return this.http.get(`${environment.apiUrl}/${this.routeName}/${idContract}/prints`);
  }



  changeStatus(id: number, rf_code: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.routeName}/change_status`,
      JSON.stringify({ id: id, rfid: rf_code }), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

}
