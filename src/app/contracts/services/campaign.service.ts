import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Campaign } from '../../classes/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = {
    headers: this.headers
  };

  routeName: string;
  constructor(public http: HttpClient) {
    this.routeName = 'campaigns';
  }

  /**
   * Get a collection of Campaigns
   * @returns {Observable<Campaign[]>}
   */
  getCampaigns(params?: string): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${environment.apiUrl}/${this.routeName}${params}`);
  }


  /**
   * Get a Campaign
   * @param id
   * @returns {Observable<Campaign[]>}
   */
  getCampaign(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Add a Campaign
   * @param Campaign
   * @returns {Observable<Campaign[]>}
   */
  addCampaign(campaign: Campaign): Observable<Campaign[]> {
    return this.http.post<Campaign[]>(`${environment.apiUrl}/${this.routeName}`, JSON.stringify(campaign), this.options);
  }


  /**
   * Edit a Campaign
   * @param Campaign
   * @returns {Observable<Campaign>}
   */
  editCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${environment.apiUrl}/${this.routeName}/${campaign.id}`, JSON.stringify(campaign), this.options);
  }

  /**
   * Delete a Campaign
   * @param id  the id of the Campaign intended to delete
   * @returns {Observable<any>}
   */
  deleteCampaign(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.routeName}/${id}`, this.options);
  }

  /**
   * Format data depending of API
   * @param dat
   * @param test
   * @returns {any}
   */
  dataFormatter(dat, test) {
    return (!test) ? dat['data'] : dat;
  }
}
