import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Stock } from '../../../shared/classes/stock';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    routeName = 'stocks';

    stock: any = {};

    constructor(private http: HttpClient) {
    }


    getStockDx(loadOptions: any, filter?: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(loadOptions), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getStockSituationDx(params: any, param = ''): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/situation/grid${param}`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    placeOrder(orders: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/orders`, JSON.stringify(orders), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getStatsVar() {
        return [
            { name: 'Quantité Livrée', value: 220 },
            { name: 'Quantité Transfer Sortie', value: 110 },
            { name: 'Quantité Transfer Entrée', value: 135 },
            { name: 'Quantité Retour Agriculteur', value: 1400 },
            { name: 'Quantité Retour Fournisseur', value: 430 },
            { name: 'Quantité servie', value: 570 },
            { name: 'Quantité en stock', value: 380 }
        ];
    }
}
