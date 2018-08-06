import { Injectable } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { Card } from './card';
import { Document } from './document';
import { Warehouse } from './warehouse';


@Injectable({
  providedIn: 'root',
})

export class Third {

  id?: number;
  code: string;
  code_as400: string;
  type: string; // 'legal', 'natural'
  company_name: string;
  rc: string;
  patent_number: string;
  if: string;
  ice: string;
  cin: string;
  full_name: string;
  full_name_ar: string;
  email: string;
  birth_date: Date;
  death_date: Date;
  sexe: string; // 'f', 'm'
  address: string;
  address_ar: string;
  city: string;
  district: string;
  commandment: string;
  commune: string;
  region: string;
  zip_code: string;
  tel1: string;
  tel2: string;
  civil_status: string; // 'single', 'married', 'divorce'
  children_number: number;
  is_insured: boolean;
  is_retired: boolean;
  tva_code: string;
  education_degree: string; // 'primary', 'junior', 'senior', 'higher', 'none'
  payment_method: string; // 'transfer', 'cheque'
  bank_code: string;
  bank_account_number: string;
  bank_rib_key: string;
  bank_name: string;
  rib?: string;

  morale?: boolean;
  third_party_structure_types?: string;

  documents: Document[];
  cards?: Card[];
  types?: any;
  warehouses?: Warehouse[];
  created_at?: Date;
  updated_at?: Date;



  constructor() {

    this.payment_method = 'transfer';
    this.morale = false;
    this.third_party_structure_types = 'aggregated';
    this.type = (this.morale) ? 'legal' : 'natural';
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
