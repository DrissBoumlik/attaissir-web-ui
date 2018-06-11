import { Injectable } from '@angular/core';
import { Third } from './third';
import { Structure } from './structure';
import { Campaign } from './campaign';


@Injectable({
  providedIn: 'root',
})

export class Contract {
  id?: number;
  code?: string;
  application_date: Date;
  expiration_date: Date;
  signature_date: Date;
  // culture_type: string; // ['cas', 'bas'])->nullable();
  type: string; // [''multiyear', 'annual''])->nullable();
  status: string; // 'draft','inprogress', 'actif', 'inactif', 'suspended', 'blocked', 'expired';
  contracted_surface: any; // 'Ex: [{"compaign":"2018/2019","surface":"5"},{"compaign":"2019/2020","surface":"9"}]'
  compaign_surface: number;
  costum_fields: string;
  third_party_id?: number;
  campaign_id: number;
  structure_id?: number;
  parent_id?: number;
  documents?: any;
  third?: Third;
  structure?: Structure;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
    this.status = 'inprogress';
  }


}
