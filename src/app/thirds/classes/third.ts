import {Injectable} from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';


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
  isCorporation: boolean;
  actionsPermission: any;
  created_date: Date;
  updated_date: Date;
  bank_accounts: any;
  morale?: boolean;

  constructor() {
    this.types = [
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
    ];
    this.etat = true;
    this.isCorporation = false;
    this.payment_mode = 'virement';
    this.morale = false;
    this.civility = (this.morale) ? 'morale' : 'physique';
  }
  /**
   * Devextreme data source
   * @param {Third[]} dat
   * @returns {DevExpress.data.DataSource}
   */
  static getDataSource = (dat: Third[]) => {
    return new DataSource({
      store: new ArrayStore({
        data: dat,
        key: 'id'
      }),
      searchExpr: ['cin']
    });
  }
}
