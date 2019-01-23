import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class Warehouse {
    id?: number;
    name: string;
    address: string;
    city: string;
    zip_code: any;
    tel: any;
    email: string;
    convention_ref: any;
    structure_id: any;
    third_party_id: any;
    zone_id: any;
    created_at?: Date;
    updated_at?: Date;
}
