import { Component, OnInit } from '@angular/core';
import { DemandesService } from '../../service/demandes.service';
import CustomStore from 'devextreme/data/custom_store';

import { Helper } from '../../../../shared/classes/helper';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    list_des_demandes: any;
    helper: any;
    constructor(public DemandesService: DemandesService) {
        this.helper = Helper;
        this.list_des_demandes = {};
    }

    ngOnInit() {
        this.list_des_demandes.store = new CustomStore({
            load: (loadOptions: any) => {
                loadOptions['requireTotalCount'] = true;
                return this.DemandesService.getListeDemandesDx(loadOptions)
                    .toPromise()
                    .then(response => {
                        console.log(response);
                        const json = response;
                        return json;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        });
    }



    gotoShow() {

    }

    getStatusColor() {

    }

}
