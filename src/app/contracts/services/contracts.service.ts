import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(public http: HttpClient) { }

  /**
   * Get a collection of Contracts
   * @returns {Observable<Contact[]>}
   */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiUrl}/${this.fake}`);
  }

  /**
   * Get a Contracts
   * @param id
   * @returns {Observable<Contact[]>}
   */
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${environment.apiUrl}/${this.fake}/${id}`);
  }

  /**
   * Add a contracts
   * @param Contact
   * @returns {Observable<Contact[]>}
   */
  addContact(Contact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(`${environment.apiUrl}/${this.fake}`, JSON.stringify(Contact), this.options);
  }

  /**
   * Edit a contracts
   * @param Contact
   * @returns {Observable<Contact>}
   */
  editContact(Contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${environment.apiUrl}/${this.fake}/${Contact.id}`, JSON.stringify(Contact), this.options);
  }

  /**
   * Delete a contracts
   * @param id  the id of the contracts intended to delete
   * @returns {Observable<any>}
   */
  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.fake}/${id}`, this.options);
  }
}
