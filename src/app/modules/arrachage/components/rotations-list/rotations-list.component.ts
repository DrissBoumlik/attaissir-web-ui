import {Component, OnInit, ViewChild} from '@angular/core';
import {ArrachageService} from '../../services/arrachage.service';
import {ToastrService} from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {Helper} from '../../../../shared/classes/helper';
import {isNull} from 'util';
import {DxDataGridComponent} from 'devextreme-angular';
import {ModelHasPermissionService} from '../../services/model-has-permission.service';

@Component({
    selector: 'app-rotations-list',
    templateUrl: './rotations-list.component.html',
    styleUrls: ['./rotations-list.component.scss']
})
export class RotationsListComponent implements OnInit {

    rotations: any = {};
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
    encodingStatusEditorOptions = {
        dataSource: [
            {code: 'awaiting', text: 'En attent d\'encodage'},
            {code: 'loading', text: 'Encodeé | en cours de chargement'},
            {code: 'loaded', text: 'Encodeé | chargeé'},
        ],
        valueExpr: 'code',
        displayExpr: 'text',
    };
    manualAssignmentSubmitButtonEditorOptios: any = {
        text: 'Valider',
        useSubmitBehaviour: true,
        onClick: () => {
            this.arrachageService
                .assignVehiculeToRotationManual(
                    this.manual_assignment.id_truck,
                    this.manual_assignment.id_loader,
                    this.manual_assignment.encoding_status,
                    this.manual_assignment.last_rotation,
                    this.selectedParcel,
                    this.selectedRotation
                    )
                .subscribe((res) => {
                    this.popupVisible = false;
                    this.toaster.success('La rotation  a été affectée avec succès', 'Affectation', {
                        positionClass: 'toast-top-center'
                    });
                    this.manual_assignment = {};
                    this.dataGrid.instance.refresh();
                });
        }
    };
    manualAssignmentEditorOptios: any = {};
    loaderManualAssignmentEditorOptios: any = {};
    popupVisible = false;
    assignPopUpVisible = false;
    helper: Helper;
    today: any;
    returnedCamion: any = {};
    returnedRotation: any = {};
    validateAssignmentGrid = false;
    selectedRotation: any;
    @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
    selectedParcel: any;


    constructor(private arrachageService: ArrachageService,
                private toaster: ToastrService) {
        this.helper = Helper;
        this.today = Date.now();
        this.submitButtonOptions = {
            text: 'Consulter',
            type: 'default',
            icon: 'check',
            useSubmitBehavior: true,
            onClick: ($ev) => {
                this.arrachageService.proposeAssignment(this.ridelle.code).subscribe((res) => {
                    if (res.data.camion) {
                        this.returnedCamion = res.data.camion;
                        this.returnedRotation = res.data.rotation;
                        this.dataSource = [{
                            returnedCamion: this.returnedCamion,
                            returnedRotation: this.returnedRotation
                        }];
                        this.validateAssignmentGrid = true;
                    }
                }, err => {
                    this.toaster.warning(err.error.message, err.error.data, {
                        positionClass: 'toast-top-center'
                    });
                });
            }
        };
    }

    ngOnInit() {
        this.rotations.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.arrachageService.getGeneratedParcels(loadOptions)
                    .toPromise()
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }, update: (oldData: any, newData: any) => {
                newData.rot_id = oldData.rot_id;
                console.log(newData);
                return this.arrachageService.addManualEncoding(newData)
                    .toPromise()
                    .then(response => {
                        return response;
                    })
                    .catch(err => {
                        throw  err;
                    });
            }
        });
    }

    showRotations(data: any) {
        console.log(data);
        this.popupVisible = true;
        this.selectedRotation = data.value;
        this.selectedParcel = data.data.p_id;
        /*return this.arrachageService.getRotations(data)
            .subscribe((res: any) => {
                this.popupVisible = true;
                this.selectedConvocation = res.data;
            }, error => {
                console.log(error);
            });*/
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

    cancel = (data, btn) => {
        this.arrachageService.cancelRotation(data.data.rot_id)
            .subscribe(
                (res: any) => {
                    btn.disabled = true;
                    this.toaster.success(`La rotation  ${res.data.id} a été annulée avec succès `, 'Success', {
                        positionClass: 'toast-top-center'
                    });
                }, err => {
                    this.toaster.warning(err.error.message, err.error.data, {
                        positionClass: 'toast-top-center'
                    });
                }
            );
    }
    disableDeleteBtn = (data) => {
        return data.rot_status === 'done';
    }



    assignByRC() {
        this.assignPopUpVisible = true;
    }

    validateAssignment() {
        this.arrachageService.proposeAssignment(this.returnedCamion.ridelle_code, true).subscribe((res) => {
            this.assignPopUpVisible = false;
            this.toaster.success(`La parcelle  ${res.rotation.p_name} a été affectée avec succès `, 'Success', {
                positionClass: 'toast-top-center'
            });
        }, err => {
            this.toaster.warning(err.error.message, err.error.data, {
                positionClass: 'toast-top-center'
            });
        });
    }

    clearAssignmentData() {
        this.returnedCamion = null;
        this.returnedRotation = null;
    }

    loadVehicles(e: any) {
        this.arrachageService.getAvailableVehicles(this.selectedRotation)
            .subscribe(
                (res: any) => {
                    console.log(res);
                    this.manualAssignmentEditorOptios = {
                        items: res.data.trucks,
                        valueExpr: 'id',
                        displayExpr: 'ridelle_code',
                    };
                    this.loaderManualAssignmentEditorOptios = {
                        items: res.data.loaders,
                        valueExpr: 'id',
                        displayExpr: 'ridelle_code',
                    };
                }
            );
    }

    onEditingStart = (e) => {
        /*if (!e.key.code_encodage) {
            this.toaster.warning('Rotation déjà encodée', 'Encodage non autorisé');
            e.cancel = true;
        }*/
        if (!e.key.v_id) {
            this.toaster.warning('Rotation en attente d\'affectation', 'Encodage non autorisé');
            e.cancel = true;
        }

        const schema = {
            encoding: {
                status: {}
            }
        };
    };

    modeHaspermission(strings: string[]) {
        return ModelHasPermissionService.modelHahPermission(strings);
    }
}
