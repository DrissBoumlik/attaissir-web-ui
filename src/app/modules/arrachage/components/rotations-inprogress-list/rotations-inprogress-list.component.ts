import {Component, OnInit, ViewChild} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {ArrachageService} from '../../services/arrachage.service';
import {ModelHasPermissionService} from '../../services/model-has-permission.service';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';
import {DxDataGridComponent} from 'devextreme-angular';
import {isNull} from 'util';
import {ZonesService} from '../../../contracts/services/zones.service';

@Component({
    selector: 'app-rotations-inprogress-list',
    templateUrl: './rotations-inprogress-list.component.html',
    styleUrls: ['./rotations-inprogress-list.component.scss']
})
export class RotationsInprogressListComponent implements OnInit {

    rotations: any = {};
    unknownTrucksPopUpVisible = false;
    verifiedTrucksPopUpVisible = false;
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
            this.loadingVisible = true;

            this.harvestService
                .assignVehiculeToRotationManual(
                    this.manual_assignment.id_truck,
                    this.manual_assignment.id_loader,
                    this.manual_assignment.encoding_status,
                    this.manual_assignment.last_rotation,
                    this.manual_assignment.parcel_id_to_modify,
                    this.selectedParcel,
                    this.selectedRotation
                )
                .subscribe((res) => {
                    this.popupVisible = false;
                    this.loadingVisible = false;
                    this.toaster.success('La rotation  a été modifiée avec succès', 'Modification', {
                        positionClass: 'toast-top-center'
                    });
                    this.manual_assignment = {};
                    this.dataGrid.instance.refresh();
                }, err => {
                    this.toaster.warning(err.error.message, err.error.data);
                    this.loadingVisible = false;

                });
        }
    };
    PrintButtonEditorOptios: any = {
        text: 'Imprimer',
        type: 'success',
        useSubmitBehaviour: false,
        onClick: () => {
            let w = window.open();
            w.document.write('<!DOCTYPE html>');
            w.document.write('<html>');
            w.document.write('<head>');

            w.document.write('<link rel="stylesheet" href="/assets/app/css/print.css" type="text/css" />');
            w.document.write('<meta name="google" value="notranslate">');
            w.document.write('</head>');
            w.document.write('<body>');
            w.document.write($('#t2').html());

            w.document.write('</body>');
            w.document.write('</html>');

            /*setTimeout(() => {
                w.print();
            }, 3000);


            setTimeout(() => {
                w.close();
            }, 5000);*/


            return true;
        }
    };
    manualAssignmentEditorOptios: any = {};
    cdaEditorOptions: any = {};
    zoneEditorOptions: any = {};
    parcelEditorOptions: any = {};
    cdas: any;
    zones: any;
    parcels: any;
    loaderManualAssignmentEditorOptios: any = {};
    popupVisible = false;
    assignPopUpVisible = false;
    helper: Helper;
    today: Date;
    selectedRotationData: any;
    returnedCamion: any = {};
    returnedRotation: any = {};
    validateAssignmentGrid = false;
    selectedRotation: any;
    @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
    selectedParcel: any;
    formatedToday: any;
    checkCorrespondencePanelVisible = false;
    currentCorsCheck: any = {};
    unknown_trucks: any = [];
    verified_trucks: any = [];
    currentUnknownTruck: any = {};
    currentVerifiedTruck: any = {};

    constructor(private harvestService: ArrachageService,
                private toaster: ToastrService,
                private zoneService: ZonesService) {
        this.helper = Helper;
        this.today = new Date();
        this.submitButtonOptions = {
            text: 'Consulter',
            type: 'default',
            icon: 'check',
            useSubmitBehavior: true,
            onClick: ($ev) => {
                this.loadingVisible = true;

                this.harvestService.proposeAssignment(this.ridelle.code).subscribe((res) => {
                    if (res.data.camion) {
                        this.loadingVisible = false;

                        this.returnedCamion = res.data.camion;
                        this.returnedRotation = res.data.rotation;
                        this.dataSource = [{
                            returnedCamion: this.returnedCamion,
                            returnedRotation: this.returnedRotation
                        }];
                        this.validateAssignmentGrid = true;
                    }
                }, err => {
                    this.loadingVisible = false;

                    this.toaster.warning(err.error.message, err.error.data, {
                        positionClass: 'toast-top-center'
                    });
                });
            }
        };
        this.formatedToday =
            ('0' + this.today.getDate()).slice(-2)
            + '/' +
            ('0' + (this.today.getMonth() + 1)).slice(-2)
            + '/' +
            this.today.getFullYear()
            + ' ' +
            this.today.getHours()
            + ':' +
            this.today.getMinutes()
            + ':' +
            this.today.getSeconds()
        ;
    }

    ngOnInit() {
        this.rotations.store = new CustomStore({
            load: (loadOptions: any) => {
                return this.harvestService.getInprogressRotations(loadOptions)
                    .toPromise()
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        });
        this.zoneService.getCDAs().subscribe(cda => {
            // CDA
            this.cdas = Helper.dataFormatter(cda, false);
            this.cdaEditorOptions = {
                label: 'CDA',
                items: this.cdas,
                displayExpr: 'name',
                valueExpr: 'zone_id',
                searchEnabled: true,
                onInitialized: (e) => {
                    console.log(200);
                    if (e.selectedItem) {
                        this.zoneService.getZonesByCDA(e.selectedItem.zone_id).subscribe(zone => {
                            this.zones = Helper.dataFormatter(zone, false);
                            this.zoneEditorOptions = {
                                label: 'Zone',
                                items: this.zones,
                                displayExpr: 'name',
                                valueExpr: 'zone_id',
                                searchEnabled: true,
                                onSelectionChanged: (event) => {
                                }
                            };
                        }, error1 => {
                            this.toaster.warning(error1.error.message);
                        });
                    }
                },
                onSelectionChanged: (e) => {
                    // Zone
                    console.log(200);
                    if (e.selectedItem) {
                        this.zoneService.getZonesByCDA(e.selectedItem.zone_id).subscribe(zone => {
                            this.zones = Helper.dataFormatter(zone, false);
                            this.zoneEditorOptions = {
                                label: 'Zone',
                                items: this.zones,
                                displayExpr: 'name',
                                valueExpr: 'zone_id',
                                searchEnabled: true,
                                onSelectionChanged: (event) => {
                                    console.log(event);
                                    if (event.selectedItem) {
                                        this.zoneService.getParcelByZone(event.selectedItem.zone_id).subscribe(parcels => {
                                            this.parcels = parcels;
                                            this.parcelEditorOptions = {
                                                label: 'Parcelle',
                                                items: this.parcels,
                                                displayExpr: 'name',
                                                valueExpr: 'id',
                                                searchEnabled: true,
                                                onSelectionChanged: (event1) => {
                                                }
                                            };
                                        }, error1 => {
                                            this.toaster.warning(error1.error.message);
                                        });
                                    }
                                }
                            };
                        }, error1 => {
                            this.toaster.warning(error1.error.message);
                        });
                    }
                }
            };
        }, error1 => {
            this.toaster.warning(error1.error.message);
        });
        this.getUnknownTruckList();

        setInterval(() => {
            this.getUnknownTruckList();
        }, 120000);

        this.getVerifiedTruckList();

        setInterval(() => {
            this.getVerifiedTruckList();
        }, 120000);
    }

    showRotations(data: any) {
        console.log(data);
        this.popupVisible = true;
        this.selectedRotation = data.value;
        this.selectedRotationData = data.data;
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
        this.loadingVisible = true;

        this.harvestService.cancelRotation(data.data.rot_id)
            .subscribe(
                (res: any) => {
                    this.loadingVisible = false;

                    btn.disabled = true;
                    this.toaster.success(`La rotation  ${res.data.id} a été annulée avec succès `, 'Success', {
                        positionClass: 'toast-top-center'
                    });
                }, err => {
                    this.loadingVisible = false;

                    this.toaster.warning(err.error.message, err.error.data, {
                        positionClass: 'toast-top-center'
                    });
                }
            );
    };

    disableDeleteBtn = (data) => {
        return data.data.rot_status === 'done';
    };


    assignByRC() {
        this.assignPopUpVisible = true;
    }

    validateAssignment() {
        this.loadingVisible = false;

        this.harvestService.proposeAssignment(this.returnedCamion.ridelle_code, true).subscribe((res) => {
            this.assignPopUpVisible = false;
            this.loadingVisible = false;

            this.toaster.success(`La parcelle  ${res.rotation.p_name} a été affectée avec succès `, 'Success', {
                positionClass: 'toast-top-center'
            });
        }, err => {
            this.loadingVisible = false;

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
        this.loadingVisible = true;

        this.harvestService.getAvailableVehicles(this.selectedRotation)
            .subscribe(
                (res: any) => {
                    this.loadingVisible = false;

                    console.log(res);
                    this.manualAssignmentEditorOptios = {
                        items: res.data.trucks,
                        valueExpr: 'id',
                        displayExpr: 'ridelle_code',
                        searchExpr: 'ridelle_code',
                        searchEnabled: true

                    };
                    this.loaderManualAssignmentEditorOptios = {
                        items: res.data.loaders,
                        valueExpr: 'id',
                        displayExpr: 'ridelle_code',
                        searchExpr: 'ridelle_code',
                        searchEnabled: true
                    };
                }, err => {
                    console.log(err);
                    this.loadingVisible = false;

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

    checkIfParcelAlreadyChanged() {
        this.loadingVisible = true;
        return this.harvestService.getInterventionById(this.selectedRotation)
            .subscribe(res => {
                this.loadingVisible = false;
                const rot = res.data;
                return rot.costum_fields.previous_data;
            }, err => {
                console.log(err);
                return true;
            });
    }

    onParcelLedClick(data: any) {
        if (!data.current_state_parcel_is_ok) {
            return;
        }
        this.currentCorsCheck.show_parcel = true;
        this.currentCorsCheck.show_ag = false;
        this.currentCorsCheck.show_loader = false;
        if (data.current_state_parcel_is_ok === true || data.current_state_parcel_is_ok === 'true') {
            this.currentCorsCheck.is_ok = true;
            this.currentCorsCheck.text = 'la carte  a été insérée dans la bonne parcelle';
            this.currentCorsCheck.title = 'Succès';
        } else {
            this.currentCorsCheck.is_ok = false;
            this.currentCorsCheck.text = 'la carte  a été insérée dans la mauvaise  parcelle';
            this.currentCorsCheck.title = 'incohérence';
        }
        this.currentCorsCheck.current_state_p_name = data.current_state_p_name;
        this.currentCorsCheck.current_state_p_center = data.current_state_p_center;
        this.currentCorsCheck.p_name = data.p_name;
        this.currentCorsCheck.truck_ridelle_code = data.truck_ridelle_code;
        if (data.current_state_parcel_is_ok === true || data.current_state_parcel_is_ok === 'true') {
            this.checkCorrespondencePanelVisible = true;
        } else {
            this.getSourceParcel();
        }
    }

    onAgCardClick(data: any) {
        if (!data.current_state_tp_code) {
            return;
        }
        this.currentCorsCheck.show_parcel = false;
        this.currentCorsCheck.show_ag = true;
        this.currentCorsCheck.show_loader = false;
        if (data.current_state_tp_is_ok === true || data.current_state_tp_is_ok === 'true') {
            this.currentCorsCheck.is_ok = true;
            this.currentCorsCheck.text = 'la bon carte agriculteur a été insérée';
            this.currentCorsCheck.title = 'Succès';
        } else {
            this.currentCorsCheck.is_ok = false;
            this.currentCorsCheck.text = 'la mauvaise carte agriculteur a été insérée';
            this.currentCorsCheck.title = 'incohérence';
        }
        this.currentCorsCheck.current_state_tp_code = data.current_state_tp_code;
        this.currentCorsCheck.tp_code = data.tp_code;
        this.checkCorrespondencePanelVisible = true;
    }

    onLoaderCardClick(data: any) {
        if (!data.current_state_loader_id) {
            return;
        }
        this.currentCorsCheck.show_parcel = false;
        this.currentCorsCheck.show_ag = false;
        this.currentCorsCheck.show_loader = true;

        if (data.current_state_loader_is_ok === 'true' || data.current_state_loader_is_ok === true) {
            this.currentCorsCheck.is_ok = true;
            this.currentCorsCheck.text = 'la bon carte chargeuse a été insérée';
            this.currentCorsCheck.title = 'Succès';
        } else {
            this.currentCorsCheck.is_ok = false;
            this.currentCorsCheck.text = 'la mauvaise carte chargeuse a été insérée';
            this.currentCorsCheck.title = 'incohérence';
        }
        this.currentCorsCheck.current_state_loader_id = data.current_state_loader_ridelle_code;
        this.currentCorsCheck.loader_ridelle_code = data.loader_ridelle_code;
    }


    getUnknownTruckList() {
        this.harvestService.getUnknownTruckList()
            .subscribe(
                (res: any) => {
                    this.unknown_trucks = res.data;
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    getVerifiedTruckList() {
        this.harvestService.getVerifiedTruckList()
            .subscribe(
                (res: any) => {
                    this.verified_trucks = res.data;
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    unknownTruckClicked(e: any) {
        this.currentUnknownTruck = this.unknown_trucks[e.itemIndex];
        this.unknownTrucksPopUpVisible = true;
    }

    verifiedTruckClicked(e: any) {
        this.currentVerifiedTruck = this.verified_trucks[e.itemIndex];
        this.verifiedTrucksPopUpVisible = true;
    }


    getSourceParcel() {
        this.loadingVisible = true;
        this.harvestService
            .getSourceParcel(this.currentCorsCheck.truck_ridelle_code)
            .subscribe(
                (res: any) => {
                    this.loadingVisible = false;
                    this.currentCorsCheck.current_state_p_name = res.data[0].getsourceparcel;
                    this.checkCorrespondencePanelVisible = true;
                }, (err: any) => {
                    this.loadingVisible = false;
                    this.checkCorrespondencePanelVisible = true;
                }
            );

    }


}
