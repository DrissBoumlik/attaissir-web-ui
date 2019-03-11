import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReportingService} from '../../../services/reporting-service.service';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';

@Component({
    selector: 'app-hourly-reception',
    templateUrl: './hourly-reception.component.html',
    styleUrls: ['./hourly-reception.component.scss']
})
export class HourlyReceptionComponent implements OnInit {

    receptions: any = {};
    chartData: any = {};
    chartLoadingIndicator: any = {};
    @ViewChild('chartContainer') chartContainer: ElementRef;

    constructor(private reportingService: ReportingService) {
    }

    ngOnInit() {
        this.receptions.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getHourlyReceptionStateDx(loadOptions)
                    .toPromise()
                    .then(response => {
                        const json = response;
                        return json;
                    })
                    .catch(error => {
                        console.log(error);
                        throw error;
                    });
            }
        });
        this.chartLoadingIndicator = true;
        this.reportingService.getHourlyReceptionStateCx()
            .subscribe((res: any) => {
                this.chartLoadingIndicator = false;
                this.chartData = res.data.map(l => {
                    l.poids_net_accumulated = parseFloat(l.poids_net_accumulated);
                    return l;
                });
            });
    }

    toggleChart() {
        const container: HTMLDivElement = this.chartContainer.nativeElement;
        container.hidden = !container.hidden;
    }

    customizeLabel = (e: any) => {
        return e.valueText + ' tonne';
    };
}
