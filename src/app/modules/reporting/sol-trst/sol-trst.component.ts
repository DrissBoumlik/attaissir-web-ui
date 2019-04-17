import {Component, OnInit} from '@angular/core';
import {ReportingService} from '../services/reporting-service.service';
import {Helper} from '../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';

@Component({
    selector: 'app-sol-trst',
    templateUrl: './sol-trst.component.html',
    styleUrls: ['./sol-trst.component.scss']
})
export class SolTrstComponent implements OnInit {

    travaux: any = {};
    helper: any;


    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }


    ngOnInit() {
        this.reportingService
            .getTravauxSol()
            .subscribe(
                (res: any) => {
                    this.travaux = res.data;
                }
            );

    }

}
