
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Contract {
  id: number;
  ref: string;
  third_id: number;
  status = 'en_cours';
  structure_id: number;
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
