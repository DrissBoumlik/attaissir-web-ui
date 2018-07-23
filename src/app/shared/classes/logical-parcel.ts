import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LogicalParcel {
  id?: number;
  name: string;
  annuel_surface: number;
  exploited_surface: number;
  manuel_surface: number;
  gps_surface: number;
  harvested_surface: number;
  abandoned_surface: number;
  cleared_surface: number;
  stricken_surface: number;
  third_party_id?: number;
  campaign_id?: number;
  zone_id?: number;
  contract_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
