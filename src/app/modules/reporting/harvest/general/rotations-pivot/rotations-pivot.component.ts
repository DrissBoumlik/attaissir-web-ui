import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DxChartComponent, DxPivotGridComponent} from 'devextreme-angular';
import {ReportingService} from '../../../services/reporting-service.service';

@Component({
    selector: 'app-rotations-pivot',
    templateUrl: './rotations-pivot.component.html',
    styleUrls: ['./rotations-pivot.component.scss']
})
export class RotationsPivotComponent implements OnInit, AfterViewInit {
    @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
    @ViewChild(DxChartComponent) chart: DxChartComponent;

    pivotGridDataSource: any;
    dataFieldsDisplayMode: any = 'splitPanes';
    chartType: any = 'bar';
    charTypes: any = [{
        key: 'area',
        name: 'En aires',
        value: 'area'
    }, {
        key: 'stackedarea',
        name: 'En aires empilées',
        value: 'stackedarea'
    }, {
        key: 'steparea',
        name: 'En étapes',
        value: 'steparea'
    }, {
        key: 'bar',
        name: 'En barres',
        value: 'bar'
    }, {
        key: 'stackedbar',
        name: 'En barres empilées',
        value: 'stackedbar'
    }, {
        key: 'line',
        name: 'En lignes',
        value: 'line'
    }, {
        key: 'stackedline',
        name: 'En lignes empilées',
        value: 'stackedline'
    }, {
        key: 'spline',
        name: 'En SP lignes',
        value: 'spline'
    }, {
        key: 'stackedspline',
        name: 'En SP lignes empilées',
        value: 'stackedspline'
    }, {
        key: 'stepline',
        name: 'En courbes',
        value: 'stepline'
    }];
    showColumnGrandTotals = false;
    showRowGrandTotals = false;
    showRowTotals = false;
    showColumnTotals = false;
    modes = [
        {
            key: 'sp',
            name: 'Panneaux divisés',
            value: 'splitPanes'
        }, {
            key: 'as',
            name: 'Axes divisés',
            value: 'splitAxes'
        }, {
            key: 'sa',
            name: 'Axe unique',
            value: 'singleAxis'
        }
    ];
    store: any = {};

    export = {
        enabled: true,
        fileName: 'kpis'
    };

    constructor(private service: ReportingService) {
        this.customizeTooltip = this.customizeTooltip.bind(this);

        this.pivotGridDataSource = {
            retrieveFields: false,
            fields: [
                {
                    caption: 'Division',
                    dataField: 'division_reception',
                    isMeasure: false,
                    area: 'row'
                }, {
                    caption: 'CDA',
                    dataField: 'cda_name',
                    isMeasure: false,
                    area: 'row'
                }, {
                    caption: 'Zone',
                    dataField: 'z_name',
                    isMeasure: false,
                    area: 'row'
                }, {
                    dataField: 'ts',
                    dataType: 'date',
                    area: 'column',
                    isMeasure: false,
                    groupName: 'Date',
                    format: {year: '2-digit', month: '2-digit', day: '2-digit'}
                },
                {groupName: 'Date', groupInterval: 'year', groupIndex: 0, format: {year: '2-digit'}},
                {groupName: 'Date', groupInterval: 'month', groupIndex: 1, format: {month: '2-digit'}},
                {groupName: 'Date', groupInterval: 'day', groupIndex: 2},
                {groupName: 'Date', groupInterval: 'hour', groupIndex: 3, format: 'hour'},
                {
                    caption: 'Poids net',
                    dataField: 'poids_net',
                    dataType: 'number',
                    summaryType: 'sum',
                    isMeasure: true,
                    format: {
                        type: 'largeNumber',
                        precision: 2
                    },
                    area: 'data'
                }, {
                    caption: 'Poids brut',
                    dataField: 'poids_brut',
                    dataType: 'number',
                    summaryType: 'sum',
                    isMeasure: true,
                    format: {
                        type: 'largeNumber',
                        precision: 2
                    },
                    area: 'data'
                },
                {
                    caption: 'Poids brut (mécanique)',
                    dataField: 'poids_brut_came',
                    dataType: 'number',
                    summaryType: 'sum',
                    isMeasure: true,
                    format: {
                        type: 'largeNumber',
                        precision: 2
                    },
                    area: 'data'
                },
                {
                    caption: 'Poids brut (manuel)',
                    dataField: 'poids_brut_cama',
                    dataType: 'number',
                    summaryType: 'sum',
                    isMeasure: true,
                    format: {
                        type: 'largeNumber',
                        precision: 2
                    },
                    area: 'data'
                },
                {
                    caption: 'Poids net (mécanique)',
                    dataField: 'poids_net_came',
                    dataType: 'number',
                    summaryType: 'sum',
                    isMeasure: true,
                    format: {
                        type: 'largeNumber',
                        precision: 2
                    },
                    area: 'data'
                },
                {
                    caption: 'Poids net (manuel)',
                    dataField: 'poids_net_cama',
                    dataType: 'number',
                    summaryType: 'sum',
                    isMeasure: true,
                    format: {
                        type: 'largeNumber',
                        precision: 2
                    },
                    area: 'data'
                },
                {
                    caption: 'Richesse',
                    dataField: 'richesse',
                    dataType: 'number',
                    allowCrossGroupCalculation: true,
                    allowSortingBySummary: true,
                    showValues: true,
                    isMeasure: true,
                    summaryType: 'avg',
                    format: {
                        type: 'fixedPoint',
                        precision: 2
                    },
                    area: 'data'
                },
                {
                    caption: 'Fibre',
                    dataField: 'fibre',
                    dataType: 'number',
                    allowCrossGroupCalculation: true,
                    allowSortingBySummary: true,
                    showValues: true,
                    isMeasure: true,
                    summaryType: 'avg',
                    format: {
                        type: 'fixedPoint',
                        precision: 2
                    },
                    area: 'data'
                },
                {
                    caption: 'Nombre de rotations',
                    dataField: 'nbr_rotations',
                    dataType: 'number',
                    allowCrossGroupCalculation: true,
                    allowSortingBySummary: true,
                    showValues: true,
                    isMeasure: true,
                    summaryType: 'sum',
                    area: 'data'
                },
                {
                    caption: 'Rotations encodées manuellement',
                    dataField: 'nbr_rotations_manual',
                    dataType: 'number',
                    allowCrossGroupCalculation: true,
                    allowSortingBySummary: true,
                    showValues: true,
                    isMeasure: true,
                    summaryType: 'sum',
                    area: 'data'
                },
                {
                    caption: 'Rotations encodées dans la parcelle',
                    dataField: 'nbr_rotations_auto',
                    dataType: 'number',
                    allowCrossGroupCalculation: true,
                    allowSortingBySummary: true,
                    showValues: true,
                    isMeasure: true,
                    summaryType: 'sum',
                    area: 'data'
                },
                {
                    caption: 'Taux d\'encodage',
                    dataField: 'encoding_rate',
                    dataType: 'number',
                    allowCrossGroupCalculation: true,
                    allowSortingBySummary: true,
                    showValues: true,
                    isMeasure: true,
                    format: {
                        type: 'fixedPoint',
                        precision: 2
                    },
                    summaryType: 'avg',
                    area: 'data'
                }

            ],
            load: (loadOptions: any) => {
                return this.service.getDailyReceptionState()
                    .toPromise()
                    .then(
                        (res: any) => {
                            return res.data;
                        }
                    ).catch(error => {
                        console.log(error);
                        throw error;
                    });
            }
        };
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.pivotGrid.instance.bindChart(this.chart.instance, {
            dataFieldsDisplayMode: this.dataFieldsDisplayMode,
            alternateDataFields: false
        });
        setTimeout(() => {
            this.chart.instance.render();
        }, 1000);
    }

    customizeTooltip(args) {
        return {
            html: args.seriesName + ' | <div class=\'currency\'>' + args.value.toFixed(2) + '</div>'
        };
    }

    onContentReady = (e) => {
        /*const ds = e.component.getDataSource();
        if (ds.field('ts').area !== 'column') {
            ds.field('ts', {area: 'column'});
        }*/
    };

    onSelectionChanged(e) {
        this.pivotGrid.instance.bindChart(this.chart.instance, {
            dataFieldsDisplayMode: e.selectedItem.value,
            alternateDataFields: false
        });
    }

    onChartTypeSelectionChanged(e) {
        // this.chartType = e.selectedItem.value;
    }
}
