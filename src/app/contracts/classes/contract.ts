import { Injectable } from '@angular/core';
import { Third } from '../../thirds/classes/third';
import { Structure } from './structure';
import { Campaign } from './campaign';


@Injectable({
  providedIn: 'root',
})

export class Contract {
  id?: number;
  code: string;
  application_date: Date;
  expiration_date: Date;
  signature_date: Date;
  code_ormva: string;
  culture_type: string; // ['cas', 'bas'])->nullable();
  contrat_type: string; // ['pluriannuel', 'annuel', 'avenant'])->nullable();
  status: string; // ['encours', 'actif', 'inactif', 'suspendu', 'bloque', 'exprire'])->default('encours');
  costum_fields: string;
  third?: Third;
  structure?: Structure;
  campaign?: Campaign;
  created_at?: Date;
  updated_at?: Date;

  constructor() {
    this.status = 'draft';
  }
}
