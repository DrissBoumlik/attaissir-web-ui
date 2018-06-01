import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Ground {
  id?: number;
  mle: string;
  common_rural: string;
  total_surface: number;
  bare_surface: number;
  identified_surface: number;
  ground_number: number;
  culture_number: number;
  legal_status: string;
  mode_worth: string; // ['propritaire', 'location', 'procuration'];
  coords_geo: string;
  costum_fields: string;
  zone_id: number;
}
