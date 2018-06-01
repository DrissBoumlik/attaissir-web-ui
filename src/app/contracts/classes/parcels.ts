import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Parcels {
  id?: number;
  exploited_surface: number;
  manuel_surface: number;
  gps_surface: number;
  harvested_surface: number;
  abandoned_surface: number;
  cleared_surface: number;
  stricken_surface: number;
  irrigation_mode: string; // ['gravitaire', 'aspersif'];
  coords_geo: string;
  costum_fields: string;
  ground_id: number;
  contracted_area_id: number;
  created_at?: number;
  updated_at?: number;
}
