import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReportingService} from '../../../services/reporting-service.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-hourly-reception-cda',
  templateUrl: './hourly-reception-cda.component.html',
  styleUrls: ['./hourly-reception-cda.component.scss']
})
export class HourlyReceptionCdaComponent implements OnInit {

    receptions: any = {};
    chartData: any = {};
    chartLoadingIndicator: any = {};
    now = new Date();

    @ViewChild('chartContainer') chartContainer: ElementRef;

    constructor(private reportingService: ReportingService) {
    }

    ngOnInit() {
        this.receptions.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.reportingService.getHourlyReceptionStateCDADx(loadOptions)
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
        this.getChartData(this.now);
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
    customizeTooltipTech(arg: any) {
        return {
            text: arg.valueText
        };
    }

    updateChart(e: any) {
       this.getChartData(e.value);
    }
    getChartData(houre: any) {
        this.chartLoadingIndicator = true;
        this.reportingService.getHourlyReceptionStateCDACx(houre)
            .subscribe((res: any) => {
                this.chartLoadingIndicator = false;
                this.chartData = res.data.map(l => {
                    l.poids_net_accumulated = parseFloat(l.poids_net_accumulated);
                    l.poids_net = parseFloat(l.poids_net);
                    l.poids_net_combine_accumulated = parseFloat(l.poids_net_combine_accumulated);
                    l.poids_net_combine = parseFloat(l.poids_net_combine);
                    l.poids_net_cama_sum_accumulated = parseFloat(l.poids_net_cama_sum_accumulated);
                    l.poids_net_cama_sum = parseFloat(l.poids_net_cama_sum);
                    l.poids_net_came_sum_accumulated = parseFloat(l.poids_net_came_sum_accumulated);
                    l.poids_net_came_sum = parseFloat(l.poids_net_came_sum);
                    l.net_impurete = parseFloat(l.net_impurete);
                    l.fibre = parseFloat(l.fibre);
                    l.richesse = parseFloat(l.richesse);
                    l.srt_labo = parseFloat(l.srt_labo);
                    l.purete = parseFloat(l.purete);
                    if (l.poids_net_accumulated === 0) {
                        delete l.poids_net_accumulated;
                        delete l.poids_net;
                    }
                    if (l.poids_net_combine_accumulated === 0) {
                        delete l.poids_net_combine_accumulated;
                        delete l.poids_net_combine;
                    }
                    if (l.poids_net_cama_sum_accumulated === 0) {
                        delete l.poids_net_cama_sum_accumulated;
                        delete l.poids_net_cama_sum;
                    }
                    if (l.poids_net_came_sum_accumulated === 0) {
                        delete l.poids_net_came_sum_accumulated;
                        delete l.poids_net_came_sum;
                    }
                    return l;
                });
            });
    }
}
