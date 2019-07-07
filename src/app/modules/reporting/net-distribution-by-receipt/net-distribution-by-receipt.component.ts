import { Component, OnInit } from '@angular/core';
import {ReportingService} from '../services/reporting-service.service';
import {Helper} from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-net-distribution-by-receipt',
  templateUrl: './net-distribution-by-receipt.component.html',
  styleUrls: ['./net-distribution-by-receipt.component.scss']
})
export class NetDistributionByReceiptComponent implements OnInit {

    distributions: any = {};
    helper: any;


    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }


    ngOnInit() {
        this.distributions.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getNetDistributionsByReceipt(loadOptions)
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


}
