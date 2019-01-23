import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import { ArrachageService } from '../../services/arrachage.service';
import { DxChartComponent, DxDataGridComponent } from 'devextreme-angular';
import { HarvestConvocation } from '../../classes/HarvestConvocation';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

    chartVisible = true;
    chartLoadingIndicator = false;
    helper: any;
    popupVisible = false;
    loadingVisible = false;
    error: any = {};
    clickedConvocationButton: any = {};
    submitButtonOptions: any = {};
    filePath = [];
    custom_error_codes = [900];
    motif: any = {};
    parcels: any = {};
    today: Date;
    configDaysFromNow: Date;
    tomorrow: Date;
    currentRow: HarvestConvocation;
    data: HarvestConvocation[] = [];
    chartData: any = [];
    chartOriginalSize: any;

    @ViewChild('chartContainer') chartContainer: ElementRef;
    @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
    @ViewChild('chart') chart: DxChartComponent;
    harvest_dates: any[] = [];

    constructor(private arrachageService: ArrachageService,
        private toaster: ToastrService) {
        this.helper = Helper;
        this.today = new Date();
        this.tomorrow = new Date();
        this.configDaysFromNow = new Date();
        this.tomorrow.setDate(this.today.getDate() + 1);
        this.submitButtonOptions = {
            text: 'Valider et envoyer',
            type: 'success',
            icon: 'check',
            useSubmitBehavior: true,
            onClick: ($ev) => {
                this.loadingVisible = true;
                if (!this.motif.motif.length || !this.motif.description || !this.custom_error_codes.includes(+this.error.code)) {
                    this.toaster.info('Veuillez remplir tous les champs obligatoires', 'champs obligatoires', {
                        positionClass: 'toast-top-center'
                    });
                    return;
                }
                this.currentRow.is_exception = {
                    motif: this.motif.motif[0],
                    description: this.motif.description
                };
                this.arrachageService.convocate(this.currentRow).subscribe(
                    (res: any) => {
                        this.toaster.success(`La parcelle  ${this.currentRow.parcel_name} a été convocée avec succès `, 'Success', {
                            positionClass: 'toast-top-center'
                        });
                        this.clickedConvocationButton.disabled = true;
                        this.loadingVisible = false;
                        this.popupVisible = false;
                        this.updateChartData();
                    },
                    (err: any) => {
                        this.toaster.error(err.error.message, err.error.data, {
                            positionClass: 'toast-top-center'
                        });
                        this.loadingVisible = false;
                    }
                );
            }
        };
    }

    customizePoint = (arg: any) => {
        return { color: '#3adb64', hoverStyle: { color: '#75ffae' } };
    };

    customizeLabel = (e: any) => {
        return e.valueText + ' tonne';
    };

    ngOnInit() {
        this.arrachageService.getStructureConfig().subscribe(
            (res: any) => {
                console.log(JSON.parse(res.data));
                this.configDaysFromNow.setDate(this.today.getDate() + +JSON.parse(res.data).day_to_harvest);
                this.harvest_dates.push(this.configDaysFromNow);
                this.updateChartData();
            }
        );
        this.parcels.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.arrachageService.getOrderedParcels(loadOptions)
                    .toPromise()
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }, update: (loadOptions: any) => {
                console.log(loadOptions);
                return Promise.resolve(true);
            }
        });
    }

    valuechange(e: any, data: any, value: any): void {
        if (data.column.dataField === 'start_date' || data.column.dataField === 'end_date') {
            this.harvest_dates.push(value);
            this.updateChartData();
        }
        const found = this.data.find(con => {
            return con.parcel_id === data.data.p_id;
        });
        if (found) {
            found[data.column.dataField] = value;
        } else {
            const newHC = new HarvestConvocation();
            newHC.parcel_id = data.data.p_id;
            newHC.start_date = this.configDaysFromNow;
            newHC.sup_semi = this.dataGrid.instance.getKeyByRowIndex(data.rowIndex).sup_semi;
            newHC.end_date = this.configDaysFromNow;
            newHC.parcel_name = data.data.p_name;
            newHC.p_harvest_order = data.data.p_harvest_order;
            newHC.third_party_id = data.data.tp_id;
            newHC.cda_name = data.data.cda_name;
            newHC.is_mechanical = false;
            newHC[data.column.dataField] = value;
            console.log(newHC);
            this.data.push(newHC);
        }
    }

    convocate(ev: any, data: any, btn: any): void {

        const found = this.data.find(con => {
            return con.parcel_id === data.data.p_id;
        });

        if (!found || !found.parcel_id || !found.sup_semi || !found.daily_quota || !found.start_date || !found.end_date) {
            this.toaster.info('Veuillez remplir tous les champs obligatoires', 'champs obligatoires', {
                positionClass: 'toast-top-center'
            });
            return;
        }

        if (found.start_date > found.end_date) {
            this.toaster.info('La date de début d\'arrachage doit être inférieure ou égale à la date de fin', 'Date', {
                positionClass: 'toast-top-center'
            });
            return;
        }
        this.arrachageService.convocate(found).subscribe(
            (res: any) => {
                this.toaster.success(`La parcelle  ${data.data.p_name} a été convocée avec succès `, 'Success', {
                    positionClass: 'toast-top-center'
                });
                btn.disabled = true;
                this.updateChartData();
            },
            (err: any) => {
                if (err.error.code === 901) {
                    this.toaster.warning(err.error.message, err.error.data, {
                        positionClass: 'toast-top-center'
                    });
                    return;
                }
                this.error = err.error;
                this.motif.message = this.error.message;
                this.currentRow = found;
                this.popupVisible = true;
                this.clickedConvocationButton = btn;
                /*this.toaster.error(err.error.message, err.error.data, {
                  positionClass: 'toast-top-center'
                });*/
            }
        );
    }

    clearDataOnShow() {
        this.motif.motif = [];
    }

    toggleChart() {
        const container: HTMLDivElement = this.chartContainer.nativeElement;
        /*    if (container.hidden) {
              container.classList.add('slide-out-right');
            }*/
        container.hidden = !container.hidden;
        /*this.chartOriginalSize = this.chartOriginalSize ? this.chartOriginalSize : this.chart.size;
        console.log(this.chart.size);
        console.log(1111);
        this.chartVisible = !this.chartVisible;
        if (this.chartVisible) {
          this.chart.size = this.chartOriginalSize;
          return;
        }
        this.chart.size = {
          height: 0,
          width: 0
        };*/
    }

    updateChartData = () => {
        this.chartLoadingIndicator = true;
        const maxDate = new Date(Math.max.apply(null, this.harvest_dates));
        const minDate = new Date(Math.min.apply(null, this.harvest_dates));
        maxDate.setDate(maxDate.getDate() - 1);
        minDate.setDate(minDate.getDate() - 1);
        this.arrachageService.getChartData(minDate, maxDate)
            .subscribe(
                (cData: any) => {
                    this.chartLoadingIndicator = false;
                    this.chartData = cData.data;
                });
    };
}
