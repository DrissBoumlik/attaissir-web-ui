import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import { ArrachageService } from '../../services/arrachage.service';
import { isNull } from 'util';
import { environment } from '../../../../../environments/environment';
import {DxChartComponent} from 'devextreme-angular';

@Component({
    selector: 'app-convoation-list',
    templateUrl: './convoation-list.component.html',
    styleUrls: ['./convoation-list.component.scss']
})
export class ConvoationListComponent implements OnInit, AfterViewInit {

    convocations: any = {};
    rotation: any = {};
    submitButtonOptions: any = {};
    currentConvocation: any = {};
    TypeCamionEditorOptions: any = {};
    camionTypes: any = {};
    helper: any;
    today: Date;
    tomorrow: Date;
    sevenDaysEarlier: Date;
    popupVisible = false;
    loadingVisible = false;
    chartData: any = {};
    chartLoadingIndicator: any = {};
    @ViewChild('chartContainer') chartContainer: ElementRef;
    @ViewChild(DxChartComponent) chart: DxChartComponent;
    selectedRow: any = {};

    constructor(private arrachageService: ArrachageService,
        private toaster: ToastrService) {
        this.helper = Helper;
        this.today = new Date();
        this.tomorrow = new Date();
        this.sevenDaysEarlier = new Date();
        this.tomorrow.setDate(this.today.getDate() + 1);
        this.sevenDaysEarlier.setDate(this.tomorrow.getDate() - 7);
        this.submitButtonOptions = {
            text: 'Valider et envoyer',
            type: 'success',
            icon: 'check',
            useSubmitBehavior: true,
            onClick: ($ev) => {
                if (!this.rotation.type_camion || !this.rotation.nbr_camion) {
                    return;
                }
                this.loadingVisible = true;
                this.arrachageService.genrateRotations({
                    idConvocation: this.currentConvocation.data.ir_id,
                    nbr_camions: this.rotation.nbr_camion,
                    type_camion_id: this.rotation.type_camion
                }).subscribe((res) => {
                    this.popupVisible = false;
                    console.log(this.currentConvocation.btn);
                    this.currentConvocation.btn.disabled = true;
                    this.loadingVisible = false;
                    this.updateChartData();
                }, error1 => {
                    this.loadingVisible = false;
                });
            }
        };
    }

    customizeLabel = (e: any) => {
        return e.valueText + ' tonne';
    };

    ngOnInit() {
        this.updateChartData();
        this.convocations.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.arrachageService.getConvocationsDx(loadOptions)
                    .toPromise()
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        });
        this.arrachageService.getCamionTypes().subscribe(
            (camions: any) => {
                this.camionTypes = camions;
                this.TypeCamionEditorOptions = {
                    label: 'Type de camions',
                    items: camions,
                    displayExpr: 'taille',
                    valueExpr: 'id',
                    searchEnabled: true,
                };
            });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.chart.instance.render();
        }, 1000);
    }
    getStatusColor(value: string): string {
        if (isNull(value)) {
            return 'm-badge m-badge--primary m-badge--wide';
        }
        if (value.toLowerCase() === 'done'.toLowerCase() || value.toLowerCase() === 'validé'.toLowerCase()) {
            return 'm-badge m-badge--warning m-badge--wide';
        } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'convoqué'.toLowerCase()) {
            return 'm-badge m-badge--success m-badge--wide';
        } else {
            return 'm-badge m-badge--primary m-badge--wide';
        }
    }

    downloadDocument(idMotif: number) {
        this.arrachageService.downloadMotif(idMotif).subscribe(
            (res: any) => {
                window.open(res.data.file);
            }, error1 => {
                console.log(error1);
            }
        );
    }


    generate(ev: any, data: any, btn: any): void {
        this.popupVisible = true;
        this.currentConvocation = {
            data: data.data,
            btn: btn
        };
    }


    getDatedifference = (dateValue: string) => {
        const date = new Date(+dateValue.substr(6, 4), +dateValue.substr(3, 2), +dateValue.substr(0, 2));
        return date.getDate() === this.tomorrow.getDate();
    };

    clearDataOnShow = () => {
    };

    updateChartData = () => {
        this.chartLoadingIndicator = true;
        this.arrachageService.getGeneratedTonnageChartData(this.sevenDaysEarlier, this.today)
            .subscribe(
                (cData: any) => {
                    this.chartLoadingIndicator = false;
                    this.chartData = cData.data;
                });
    };

    toggleChart() {
        const container: HTMLDivElement = this.chartContainer.nativeElement;
        /*    if (container.hidden) {
              container.classList.add('slide-out-right');
            }*/
        container.hidden = !container.hidden;
    }

    printBn(data: any) {
        this.selectedRow = data.data;
        this.arrachageService.printConvocation(this.selectedRow.ir_id);
    }
}
