import { Component, OnInit } from '@angular/core';
import {ReportingService} from '../services/reporting-service.service';
import {Helper} from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';

@Component({
    selector: 'app-material-allocation',
    templateUrl: './material-allocation.component.html',
    styleUrls: ['./material-allocation.component.scss']
})
export class MaterialAllocationComponent implements OnInit {

    alocations: any = {};
    helper: any;


    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }


    ngOnInit() {
        this.alocations.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getMaterialAlocations(loadOptions)
                    .toPromise()
                    .then(response => {
                        const json = response;
                        return json;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        });

    }

}
