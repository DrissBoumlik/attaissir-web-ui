import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Ground {
    id?: number;
    mle: string;
    perimeter: string;
    region: string;
    borough: string;
    cda: string;
    zone: string;
    sector: string;
    block: string;
    common_rural: string;
    total_surface: number;
    bare_surface: number;
    identified_surface: number;
    ground_number: number;
    culture_number: number;
    legal_status: string;
    coords_geo: string;
    costum_fields: string;
}
