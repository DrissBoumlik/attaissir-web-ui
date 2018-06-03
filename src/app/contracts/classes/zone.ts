import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Zone {
  id?: number;
  label: string;
  label_visible: boolean;
  code: string;
  color: string;
  coords_geo: string;
  coords_visible: boolean;
  total_surface: number;
  cultivable_surface: number;
  type: any;
  zone_id?: number;
  zone_type_id?: number;

  constructor() {
  }
}
