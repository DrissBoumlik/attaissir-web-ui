import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class StructureZone {
    id?: number;
    start_date: Date;
    end_date: Date;
    status: boolean;
    structure_id?: number;
    zone_id?: number;
    created_at?: Date;
    updated_at?: Date;

    constructor() {
        this.status = true;
    }
}
