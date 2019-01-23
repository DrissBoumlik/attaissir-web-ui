import { Component, OnInit } from '@angular/core';
import { MouvementsService } from '../../mouvements/service/mouvements.service';
import { Helper } from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import { isNull } from 'util';

@Component({
    selector: 'app-mouvements',
    templateUrl: './mouvements.component.html',
    styleUrls: ['./mouvements.component.scss']
})
export class MouvementsComponent implements OnInit {


    mouvements: any = {};
    helper: any;


    constructor(private mouvementsService: MouvementsService) {
        this.helper = Helper;
    }


    ngOnInit() {
        this.mouvements.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.mouvementsService.getListeMouvementDetailsDx(loadOptions)
                    .toPromise()
                    .then(response => {
                        console.log(response);
                        const res = [];
                        response.data.map(
                            (mv: any) => {
                                mv.so_type = this.orderType(mv.so_type, mv.stock_type);
                                mv.so_state = Helper.getStatusValue(mv.so_state);
                                mv.emetteur = {
                                    id: mv.ss_id ? mv.ss_id : mv.tsd_id,
                                    name: mv.ss_name ? mv.ss_name : mv.tsd_full_name,
                                    address: mv.ss_address ? mv.ss_address : mv.tsd_address,
                                    tel: mv.ss_tel ? mv.ss_tel : mv.tsd_tel1,
                                    email: mv.ss_email ? mv.ss_email : mv.tsd_email,
                                    rc: mv.tsd_rc ? mv.tsd_rc : '',
                                    patent_number: mv.tsd_patent_number ? mv.tsd_patent_number : '',
                                    i_f: mv.tsd_if ? mv.tsd_if : '',
                                    ice: mv.tsd_ice ? mv.tsd_ice : '',
                                    tva_code: mv.tsd_tva_code ? mv.tsd_tva_code : '',
                                };
                                mv.recepteur = {
                                    id: mv.sd_id ? mv.sd_id : mv.tsd_id,
                                    name: mv.sd_name ? mv.sd_name : mv.tsd_full_name,
                                    address: mv.sd_address ? mv.sd_address : mv.tsd_address,
                                    tel: mv.sd_tel ? mv.sd_tel : mv.tsd_tel1,
                                    email: mv.sd_email ? mv.sd_email : mv.tsd_email
                                };
                                return mv;
                            }
                        );
                        const json = response;
                        return json;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        });

    }

    getStatusColor(value: string): string {
        if (isNull(value)) {
            return 'm-badge m-badge--primary m-badge--wide';
        }
        if (value.toLowerCase() === 'validé') {
            return 'm-badge m-badge--success m-badge--wide';
        } else if (value.toLowerCase() === 'en cours') {
            return 'm-badge m-badge--info m-badge--wide';
        } else if (value.toLowerCase() === 'annulé') {
            return 'm-badge m-badge--danger m-badge--wide';
        } else {
            return 'm-badge m-badge--primary m-badge--wide';
        }
    }


    orderType = (type: string, tp: string): string => {
        if (type === 'transfer') {
            return 'transfert';
        } else if (type === 'delivery') {
            return 'LIVRAISON';
        } else if (type === 'return') {
            return tp !== 'return_f' ? 'Retour Agriculteur' : 'Retour Fournisseur';
        } else if (type === 'receive') {
            return 'Réception des intrants';
        }
        return type;
    }

    calculateFilterExpression(filterValue, selectedFilterOperation) {
        const column = this as any;
        const filterExpression = [
            [column.dataField, 'contains', filterValue],
            'or',
            ['emetteur.name1', 'contains', filterValue]
        ];
        return filterExpression;
    }

}
