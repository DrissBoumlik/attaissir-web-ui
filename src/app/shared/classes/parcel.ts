import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Parcel {
  id?: number;
  agricultural_cycle: string;
  code_ormva: string;
  annuel_surface: number;
  tenure: string; // 'property', 'lease', 'procuration'
  exploited_surface: number;
  manuel_surface: number;
  gps_surface: number;
  harvested_surface: number;
  abandoned_surface: number;
  cleared_surface: number;
  stricken_surface: number;
  irrigation_mode: string; // 'gravity', 'sprinkling'
  coordinate: string;
  costum_fields: string;
  soil_id?: number;
  logical_parcel_id?: number;
  contract_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
