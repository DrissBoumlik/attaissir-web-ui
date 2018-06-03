import { Injectable } from '@angular/core';
import {Structure} from './structure';
import {Third} from '../../thirds/classes/third';

@Injectable({
  providedIn: 'root',
})

export class Card {
  id?: number;
  code_rfid?: string;
  serial: string;
  status: string; // ['actif', 'inactif', 'perdue']
  description: string;
  printed_at: Date;
  structure: Structure;
  third_party: Third;
  created_at?: Date;
  updated_at?: Date;

}
