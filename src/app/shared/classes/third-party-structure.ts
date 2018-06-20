import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ThirdPartyStructure {
  id?: number;
  type: string; // 'mechanization_provider', 'distribution_centre', 'cuttings_supplier', 'products_supplier', 'aggregated'
  third_party_id?: number;
  structure_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
