import { Component, OnInit } from '@angular/core';
import {ReportingService} from '../services/reporting-service.service';
import {Helper} from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-pulp-dotations',
  templateUrl: './pulp-dotations.component.html',
  styleUrls: ['./pulp-dotations.component.scss']
})
export class PulpDotationsComponent implements OnInit {

    dotations: any = {};
    helper: any;


    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }


    ngOnInit() {
        this.dotations.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getPulplDotationsDx(loadOptions)
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
