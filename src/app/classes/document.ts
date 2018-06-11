import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Document {
  id?: number;
  name: string;
  type: string; // 'cin', 'land_title', 'procuration', 'leasing_contracts', 'contrcat_aggregate', 'amendment '
  extension: string;
  path: string;
  size: string;
  costum_fields: string;
  third_party_id?: number;
  structure_id?: number;
  contract_id?: number;
  soil_id?: number;
}
