import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Structure} from '../classes/structure';

@Injectable({
  providedIn: 'root'
})
export class StructuresService {

  routeName: string;
  constructor(public http: HttpClient) {
    this.routeName = 'structures';
  }

  /**
   * Get a collection of Structures
   * @returns {Observable<Structure[]>}
   */
  getStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a Structure
   * @param id
   * @returns {Observable<Structure[]>}
   */
  getStructure(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Add a Structure
   * @param Structure
   * @returns {Observable<Structure[]>}
   */
  addStructure(structure: Structure): Observable<Structure[]> {
    return this.http.post<Structure[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(structure), this.options);
  }

  /**
   * Edit a Structure
   * @param Structure
   * @returns {Observable<Structure>}
   */
  editStructure(structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(`${environment.apiUrl}/${this.routeName}/${structure.id}`, JSON.stringify(structure), this.options);
  }

  /**
   * Delete a Structure
   * @param id  the id of the Structure intended to delete
   * @returns {Observable<any>}
   */
  deleteStructure(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, this.options);
  }
}
