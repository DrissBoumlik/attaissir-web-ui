import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Campaign {
  id: number;
  libelle: number;
  start_date: Date;
  end_date: Date;
  description: string;
  estimated_surface: number;
  estimated_tonnage: number;
  costum_fields: any;
  structure_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
  hidded?: boolean;

  constructor() {
  }
}
