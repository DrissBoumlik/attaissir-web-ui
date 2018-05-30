import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Third {

  id: number;
  types: any;
  code_siam: string;
  code_as400: string;
  civility: string;
  social_reason: string;
  rc: string;
  patent_number: string;
  if: string;
  ice: string;
  last_name: string;
  first_name: string;
  ar_last_name: string;
  ar_first_name: string;
  commune: string;
  cin: string;
  date_birth: Date;
  date_death: Date;
  gender: string;
  adress: string;
  city: string;
  street: string;
  postal_code: number;
  tel1: string;
  tel2: string;
  address_email: string;
  situation: string;
  children_number: number;
  assurance: string;
  retreat: string;
  education_level: string;
  tva_code: number;
  payment_mode: string;
  dette: number;
  etat: boolean;
  bank_accounts: [{
    id: number,
    bank: string,
    rib: string
  }];
  isCorporation: boolean;
  actionsPermission: any;
  created_date: Date;
  updated_date: Date;

  constructor() {
    this.types = [
      {
        id: 0,
        libelle: ''
      }
    ];
    this.actionsPermission = {
      delete: false,
      update: false
    };
    this.etat = true;
    this.isCorporation = false;
    this.payment_mode = 'Virement';
  }
}
