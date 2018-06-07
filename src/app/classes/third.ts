import { Injectable } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { Card } from './card';
import { Document } from './document';


@Injectable({
  providedIn: 'root',
})

export class Third {

  id?: number;
  types: any;
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
  cin: string;
  date_birth: Date;
  date_death: Date;
  gender: string;
  address: string;
  city: string;
  street: string;
  commune: string;
  postal_code: number;
  tel1: string;
  tel2: string;
  email: string;
  situation: string;
  children_number: number;
  assurance: string;
  retraite: string;
  education_level: string;
  tva_code: number;
  payement_mode: string;
  dette: number;
  etat: boolean;
  isCorporation: boolean;
  cards: Card[];
  documents: Document[];
  actionsPermission: any;
  bank_accounts: any;
  morale?: boolean;
  borough: string;
  commandment: string;
  region: string;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
    /*this.types = [
      {
        id: null,
        libelle: ''
      }
    ];
    this.bank_accounts = [
        {
          id: null,
          bank: '',
          rib: null
      }
    ];*/
    this.etat = true;
    this.isCorporation = false;
    this.payement_mode = 'virement';
    this.morale = false;
    this.civility = (this.morale) ? 'morale' : 'physique';
  }
  /**
   * Devextreme data source
   * @param {Third[]} dat
   * @param {string} search
   * @returns {DevExpress.data.DataSource}
   */
  static getDataSource = (dat: Third[], search: string) => {
    return new DataSource({
      store: new ArrayStore({
        data: dat,
        key: 'id'
      }),
      searchExpr: [search]
    });
  }
}
