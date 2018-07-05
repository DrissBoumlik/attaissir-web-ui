import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Third } from '../../../shared/classes/third';
import { ConseilleAgricole } from '../../../shared/classes/conseille-agricole';
import { Contract } from '../../../shared/classes/contract';


@Injectable({
  providedIn: 'root'
})
export class ConseilleAgricoleService {

  customers: any[];

  routeName: string;

  constructor(private http: HttpClient) {


    this.customers = [{
      'id': 0,
      'first_name': 'Super yyt1',
      'last_name': 'Street1',
      'cin': 'Bentonville1',
      'phone': 'Arkansas1',
      'adress': 727161,
      'city': 'casa1',
      'postal_code': '5551711',
      'code': '54151',
      'email': 'nowebsite@supermart.com1'
    }, {
      'id': 1,
      'first_name': 'Super yyt2',
      'last_name': 'Street2',
      'cin': 'Bentonville2',
      'phone': 'Arkansas2',
      'adress': 727162,
      'city': 'rabat2',
      'postal_code': '5551712',
      'code': '5452',
      'email': 'nowebsite@supermart.com2'
    }];


    this.routeName = 'third-parties';
  }


  /**
   * Get a collection of Third parties
   * @returns {Observable<Third[]>}
   */
  getThirds(): any {
    return this.customers;
    // return this.http.get<ConseilleAgricole[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  getConseille(id: number): Observable<any> {

    return this.customers[id];
    // return this.http.get<Third>(`${environment.apiUrl}/${this.routeName}/${id}${edit}`);
  }

}



