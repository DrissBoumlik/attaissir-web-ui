import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContractedArea } from '../classes/contracted-area';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../classes/campaign';

@Injectable({
  providedIn: 'root'
})
export class ContractedAreaService {

  routeName: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  constructor(public http: HttpClient) {
    this.routeName = 'contracted-areas';
  }

  /**
   * Get a collection of ContractedAreas
   * @returns {Observable<ContractedArea[]>}
   */
  getContractedAreas(): Observable<ContractedArea[]> {
    return this.http.get<ContractedArea[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a ContractedAreas
   * @param id
   * @returns {Observable<ContractedArea[]>}
   */
  getContractedArea(id: number): Observable<ContractedArea> {
    return this.http.get<ContractedArea>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Add a contracted area
   * @param ContractedArea
   * @returns {Observable<ContractedArea[]>}
   */
  addContractedArea(contractedArea: ContractedArea): Observable<ContractedArea[]> {
    return this.http.post<ContractedArea[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(contractedArea), this.options);
  }

  addMultiAreas(contractedArea: any): Observable<ContractedArea[]> {
    return this.http.post<ContractedArea[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(contractedArea), this.options);
  }

  /**
   * Edit a contracts
   * @param ContractedArea
   * @returns {Observable<ContractedArea>}
   */
  editContractedAreas(contracted_area: ContractedArea): Observable<ContractedArea> {
    return this.http.put<ContractedArea>(`${environment.apiUrl}/${this.routeName}/${contracted_area.id}`,
      JSON.stringify(contracted_area), this.options);
  }

  /**
   * Delete a contracts
   * @param id  the id of the contracts intended to delete
   * @returns {Observable<any>}
   */
  deleteContractedAreas(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, this.options);
  }

  /**
   * Format data depending of API
   * @param data
   * @param test
   * @returns {any}
   */
  dataFormatter(data, test) {
    return (!test) ? data['data'] : data;
  }
}
