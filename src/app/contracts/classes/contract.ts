import {Third} from '../../thirds/classes/third';
import {Structure} from './structure';

export class Contract {
  id: number;
  ref: string;
  tiers: Third;
  status = 'en_cours';
  structure: Structure;
  date_de_signature: Date;
  date_de_debut: Date;
  duree_de_contrat: number;
  campagne: string;
  CDA: number;
  douar: string;
  zone: string;
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
}
