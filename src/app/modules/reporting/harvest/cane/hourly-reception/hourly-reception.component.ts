import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportingService } from '../../../services/reporting-service.service';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../../../../shared/classes/helper';
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
    days = 7; // Days you want to subtract
    date = new Date();
    maxDate: any;
    minDate: any;
    last = new Date(this.date.getTime() - (this.days * 24 * 60 * 60 * 1000));

    @ViewChild('chartContainer') chartContainer: ElementRef;

    constructor(private reportingService: ReportingService) {
        this.maxDate = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
        this.minDate = this.last.getFullYear() + '-' + ('0' + (this.last.getMonth() + 1)).slice(-2) + '-' + ('0' + this.last.getDate()).slice(-2);
        console.log(this.minDate);
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
                    l.poids_net_combine_accumulated = parseFloat(l.poids_net_combine_accumulated);
                    l.poids_net_cama_sum_accumulated = parseFloat(l.poids_net_cama_sum_accumulated);
                    l.poids_net_came_sum_accumulated = parseFloat(l.poids_net_came_sum_accumulated);
                    if (l.poids_net_accumulated === 0) {
                        delete l.poids_net_accumulated;
                    }
                    if (l.poids_net_combine_accumulated === 0) {
                        delete l.poids_net_combine_accumulated;
                    }
                    if (l.poids_net_cama_sum_accumulated === 0) {
                        delete l.poids_net_cama_sum_accumulated;
                    }
                    if (l.poids_net_came_sum_accumulated === 0) {
                        delete l.poids_net_came_sum_accumulated;
                    }
                    return l;
                });
            });
    }

    toggleChart() {
        const container: HTMLDivElement = this.chartContainer.nativeElement;
        container.hidden = !container.hidden;
    }

    customizeLabel(e: any) {
        return e.valueText + ' tonne';
    }

    customizeTooltip(arg: any) {
        return {
            text: arg.valueText + ' tonne'
        };
    }
}
