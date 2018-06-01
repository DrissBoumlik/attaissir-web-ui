import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Structure {
  id?: number;
  libelle: string;
  code: string;
  city: string;
  address: string;
  postal_code: number;
  tel1: string;
  tel2: string;
  fax: string;
  email: string;
  logo: string;
  type: any;
  created_at?: Date;
  updated_at?: Date;


  constructor() {
    this.type = {
      id: 0,
      libelle: ''
    };
  }
}
