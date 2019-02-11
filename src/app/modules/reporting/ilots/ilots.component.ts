import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import { ReportingService } from '../services/reporting-service.service';

@Component({
    selector: 'app-ilots',
    templateUrl: './ilots.component.html',
    styleUrls: ['./ilots.component.scss']
})
export class IlotsComponent implements OnInit {

    ilots: any = {};
    helper: any;

    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }
    ngOnInit() {
        this.ilots.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getIlosDx(loadOptions)
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
