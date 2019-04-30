import {Component, OnInit, ViewChild} from '@angular/core';
import {Helper} from '../../../../shared/classes/helper';
import {DxDataGridComponent} from 'devextreme-angular';
import {ArrachageService} from '../../services/arrachage.service';
import {AuthenticationService} from '../../../../auth/_services';
import {ToastrService} from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import {isNull} from 'util';
import {ModelHasPermissionService} from '../../services/model-has-permission.service';

@Component({
  selector: 'app-operated-rotations-today',
  templateUrl: './operated-rotations-today.component.html',
  styleUrls: ['./operated-rotations-today.component.scss']
})
export class OperatedRotationsTodayComponent implements OnInit {

    rotations: any = {};
    schema_leds = {
        'current_state': {
            third_party: {
                code: 'code agrege',
                date: 'date',
                lat: 'lat',
                lng: 'lng',
                is_ok: 'third_party_parcel == third_party_carte',
            },
            parcel: {
                is_ok: 'coords within polygon'
            },
            loader: {
                loader_id: 'loader_id',
                date: 'date',
                lat: 'lat',
                lng: 'lng',
                is_ok: 'loader_rotation == loader_carte',
            }

        }
    };
    loadingVisible = false;
    schema: {
        encoding: {
            status: 'awaiting' | 'loading' | 'loaded',
            start_date: Date,
            end_date: Date,
            is_manual: boolean
        },
        result: any,
        id_truck: number,
        id_loader: number,
        last_rotation: boolean | 'confirmed'
    };
    selectedConvocation: any = {};
    submitButtonOptions: any = {};
    assignButtonOptions: any = {};
    dataSource: any = {};
    ridelle: any = {};
    manual_assignment: any = {};
    lastRotationEditorOptions = {
        value: false
    };
    validateRotationEditorOptions = {
        value: false
    };
    encodingStatusEditorOptions = {
        dataSource: [
            { code: 'awaiting', text: 'En attent d\'encodage' },
            { code: 'loading', text: 'Encodeé | en cours de chargement' },
            { code: 'loaded', text: 'Encodeé | chargeé' },
        ],
        valueExpr: 'code',
        displayExpr: 'text',
    };
    manualAssignmentSubmitButtonEditorOptios: any = {
        text: 'Valider',
        useSubmitBehaviour: true,
        onClick: () => {
            this.loadingVisible = true;

            this.arrachageService
                .assignVehiculeToRotationManual(
                    this.manual_assignment.id_truck,
                    this.manual_assignment.id_loader,
                    this.manual_assignment.encoding_status,
                    this.manual_assignment.last_rotation,
                    null,
                    this.selectedParcel,
                    this.selectedRotation,
                    this.manual_assignment.validate,
                )
                .subscribe((res) => {
                    this.popupVisible = false;
                    this.loadingVisible = false;
                    this.toaster.success('La rotation  a été affectée avec succès', 'Affectation', {
                        positionClass: 'toast-top-center'
                    });
                    this.manual_assignment = {};
                    this.dataGrid.instance.refresh();
                }, err => {
                    console.log(err);
                    this.loadingVisible = false;

                });
        }
    };
    popupVisible = false;
    helper: Helper;
    today: any;
    selectedRotation: any;
    @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
    selectedParcel: any;


    constructor(private arrachageService: ArrachageService,
                private authService: AuthenticationService,
                private toaster: ToastrService) {
        this.helper = Helper;
        this.today = Date.now();
        this.submitButtonOptions = null;
    }

    ngOnInit() {
        this.rotations.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.arrachageService.getOperatedRotationsToday(loadOptions)
                    .toPromise()
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        });
    }

    showRotations(data: any) {
        console.log(data);
        this.popupVisible = true;
        this.selectedRotation = data.value;
        this.selectedParcel = data.data.p_id;
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












    modeHaspermission(strings: string[]) {
        return ModelHasPermissionService.modelHahPermission(strings);
    }

    currentDivision() {
        return this.authService.getTanent();
    }

}
