import {Component, OnInit} from '@angular/core';
import {ReportingService} from '../../../services/reporting-service.service';
import {ModelHasPermissionService} from '../../../../arrachage/services/model-has-permission.service';
import {isNull} from "util";
import {Helper} from '../../../../../shared/classes/helper';

@Component({
    selector: 'app-parcel-ridelle-history',
    templateUrl: './parcel-ridelle-history.component.html',
    styleUrls: ['./parcel-ridelle-history.component.scss']
})
export class ParcelRidelleHistoryComponent implements OnInit {

    history: any = {};
    helper: Helper;
    parcelEditorOptions: any;
    loadingVisible = false;
    rotations: any;
    customHistoryButtonEditorOption = {
        text: 'Afficher',
        type: 'success',
        width: '100%',
        height: '100%',
        useSubmitBehavior: true,
        onClick: ($event) => {
            this.loadingVisible = true;
            console.log($event);
            this.reportingService.getParcelRidelleHistory(this.history)
                .subscribe((res: any) => {
                    this.loadingVisible = false;
                    this.rotations = res.data;
                }, (err: any) => {
                    console.log(err);
                    this.loadingVisible = false;
                });
        }
    };
    dateTimeEditorOption = {
        pickerType: 'calendar',
        type: 'datetime',
        dataType: 'date'
    };

    constructor(private reportingService: ReportingService) {
        this.helper = Helper;
    }

    ngOnInit() {
        this.loadingVisible = true;
        this.reportingService.getConvocatedParcels()
            .subscribe((res: any) => {
                this.loadingVisible = false;
                this.parcelEditorOptions = {
                    label: 'Parcelle',
                    items: res.data,
                    displayExpr: 'p_name',
                    valueExpr: 'p_id',
                    searchEnabled: true,
                    onSelectionChanged: (event1) => {
                    }
                };
            }, (err: any) => {
                console.log(err);
                this.loadingVisible = false;
            });

    }

    onFormSubmit = (e) => {
        e.preventDefault();
    }

    modeHaspermission(strings: string[]) {
        return ModelHasPermissionService.modelHahPermission(strings);
    }
    getStatusColor(value: string): string {
        if (isNull(value)) {
            return 'm-badge m-badge--primary m-badge--wide';
        }
        if (value.toLowerCase() === 'done'.toLowerCase() || value.toLowerCase() === 'validé'.toLowerCase()) {
            return 'm-badge m-badge--success m-badge--wide';
        } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'En cours'.toLowerCase()) {
            return 'm-badge m-badge--primary m-badge--wide';
        } else {
            return 'm-badge m-badge--primary m-badge--wide';
        }
    }

    getStatut = (value: string): string => {
        if (value === 'inprogress') {
            return 'ENCOURS';
        } else if (value === 'done') {
            return 'VALIDÉ';
        } else if (value === 'canceled') {
            return 'ANNULÉ';
        }
        return '';
    };

}
