import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Soils {
    id?: number;
    registration_number: string;
    rural_commune: string;
    perimeter: string;
    region: string;
    district: string;
    cda: string;
    zone: string;
    sector: string;
    block: string;
    total_surface: number;
    bare_surface: number;
    identified_surface: number;
    soil_id: number;
    culture_number: number;
    legal_status: string;
    coordinate: string;
    costum_fields: string;
    created_at?: Date;
    updated_at?: Date;
}
