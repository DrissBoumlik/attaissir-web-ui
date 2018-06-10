import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Structure {
  id?: number;
  name: string;
  code: string;
  email: string;
  city: string;
  address: string;
  zip_code: number;
  tel1: string;
  tel2: string;
  fax: string;
  logo: string;
  type: any; // 'site', 'division'
  parameters?: string;
  costum_fields?: string;
  parent_id?: number;
  created_at?: Date;
  updated_at?: Date;


  constructor() {
    this.type = {
      id: 0,
      libelle: ''
    };
  }
}
