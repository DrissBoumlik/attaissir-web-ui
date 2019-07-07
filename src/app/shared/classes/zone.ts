import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Zone {
    id?: number;
    name: string;
    name_visible: boolean;
    code: string;
    color: string;
    coordinate: string;
    is_visible: boolean;
    total_surface: number;
    cultivable_surface: number;
    type: any; // 'perimetre', 'region', 'casier', 'cda', 'zone', 'secteur', 'bloc'
    costum_fields: string;
    zone_id?: number;
    zone_type_id?: number;
    created_at?: Date;
    updated_at?: Date;

    constructor() {
    }
}
