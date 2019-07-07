import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import { ReportingService } from '../services/reporting-service.service';
import { Helper } from '../../../shared/classes/helper';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
    cards: any = {};
    helper: any;

    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }

    ngOnInit() {
        this.cards.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getCardsDx(loadOptions)
                    .toPromise()
                    .then(response => {
                        console.log(response);
                        const json = response;
                        return json;
                    })
                    .catch(error => {
                        console.log(error);
                        throw error;
                    });
            }
        });
    }

}
