import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Card {
    id?: number;
    rfid?: string;
    name: string;
    status: string; // ['actif', 'inactif', 'perdue']
    description: string;
    printed_at: Date;
    costum_fields: string;
    soil_id?: number;
    structure_id?: number;
    third_party_id?: number;
    created_at?: Date;
    updated_at?: Date;

}
