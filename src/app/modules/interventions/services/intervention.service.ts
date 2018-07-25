import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  routeName = 'categoriesdivision';

  constructor(private http: HttpClient) {
  }

  getFamiliesAndSubFamilies(structureID: number): Observable<any> {
    const division = localStorage.getItem('tenantId');
    return this.http.get(`${environment.apiUrl}/${this.routeName}/${structureID}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getDataBySubFamily(sub_family_id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interventiontypesubcategories/${sub_family_id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getServiceArticlesBySubCatID(sub_family_id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interventionrequesttypes/services/${sub_family_id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getLogicalParcelsByUserId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/logicalparcels/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addInterventionRequest(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/interventionrequests/`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getInterventionCustomFields(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interventionrequesttypes/customfields/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getParcelsDx(params?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/logicalparcels/all`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Get a Template
   * @returns {Observable<Template>}
   */
  getTemplates(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/interventionrequests/templates`);
  }


  addIng(item: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/interventionrequests/templates`, JSON.stringify(item), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  updateIntervention(id: number, data: any) {
    return this.http.put(`${environment.apiUrl}/interventionrequests/${id}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getInterventionById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interventionrequests/edit/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

