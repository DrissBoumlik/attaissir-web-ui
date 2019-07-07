import { Component, OnInit } from '@angular/core';
import {PreconisationsIntrantsService} from '../../preconisations-intrants/service/preconisations-intrants.service';
import {Helper} from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import {isNull} from "util";
import {ReportingService} from '../services/reporting-service.service';

@Component({
  selector: 'app-alocations-and-returns',
  templateUrl: './alocations-and-returns.component.html',
  styleUrls: ['./alocations-and-returns.component.scss']
})
export class AlocationsAndReturnsComponent implements OnInit {

    alocations: any = {};
    helper: any;


    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }


    ngOnInit() {
        this.alocations.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getAlocationsAndReturnsDx(loadOptions)
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
