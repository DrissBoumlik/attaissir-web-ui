import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Warehouse {
  id?: number;
  name: string;
  adress: string;
  city: string;
  postal_code: any;
  phone: any;
  email: any;
  convention_ref: any;
  structur_id: any;
  third_party_id: any;
  zone_id: any;
  created_at?: Date;
  updated_at?: Date;
}
