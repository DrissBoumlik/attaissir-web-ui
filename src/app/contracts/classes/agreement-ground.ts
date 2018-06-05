import { Injectable } from '@angular/core';
import { Ground } from './ground';
import { Contract } from './contract';

@Injectable({
  providedIn: 'root',
})

export class AgreementGround {
  id?: number;
  agri_session: string;
  annuel_surface: number;
  mode_worth: string; // ['propritaire', 'location', 'procuration'])->nullable();
  ground?: Ground;
  agreement?: Contract;
  ground_id?: number;
  agreement_id?: number;
}
