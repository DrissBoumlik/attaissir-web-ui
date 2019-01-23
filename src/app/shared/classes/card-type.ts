import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class CardType {
    id?: number;
    name: string;
    description: string;
    parameters: string;
    created_at?: Date;
    updated_at?: Date;
}
