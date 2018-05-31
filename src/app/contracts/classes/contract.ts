import { Injectable } from '@angular/core';
import {Third} from '../../thirds/classes/third';
import {Structure} from './structure';

@Injectable({
  providedIn: 'root',
})

export class Contract {
  id: number;
  ref: string;
  third: Third;
  status = 'en_cours';
  structure: Structure;
  application_date: Date;
  experation_date: Date;
  date_de_signature: Date;
  duree_de_contrat: number;
  campagne: string;
  CDA: number;
  douar: string;
  zone: string;
  code_ormva;
  arrondissement: string;
  commune: string;
  province: string;
  secteur: string;
  parcelle: string;
  superficie_total: number;
  superficie_contractee: number;
  type_de_bien: string;
  type_de_sole: string;
  culture_anterieure: string;
  mode_irrigation: string;
  culture_type: string;
  contrat_type: string;
  status: string;
}
