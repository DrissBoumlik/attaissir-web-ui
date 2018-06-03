import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ContractedArea {
  id?: number;
  contracted_surface: number;
  agreement_id?: number;
  campaign_id?: number;
}
