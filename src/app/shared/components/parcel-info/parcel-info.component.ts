import { Component, Input, OnInit } from '@angular/core';
import { ZonesService } from '../../../modules/contracts/services/zones.service';
import { ToastrService } from 'ngx-toastr';
import { Helper } from '../../classes/helper';

@Component({
    selector: 'app-parcel-info',
    templateUrl: './parcel-info.component.html',
    styleUrls: ['./parcel-info.component.scss']
})
export class ParcelInfoComponent implements OnInit {

    @Input('ilot') ilot: any;
    popupVisible = false;
    loadingVisible = false;
    cdaEditorOptions: any;
    zoneEditorOptions: any;
    ilot_info: any = {};
    parcelEditorOptions: any;
    buttonEditorOptions = {
        text: 'Valider',
        type: 'success',
        onClick: ($event) => {
            this.loadingVisible = true;
            if (this.ilot_info.parcel) {
                this.zoneService.updateIlot(this.ilot.ilot_id, this.ilot_info.parcel)
                    .subscribe(
                        (res) => {
                            this.loadingVisible = false;
                            this.popupVisible = false;
                            this.ilot_info = {};
                        }, err => {
                            console.log(err);
                            this.loadingVisible = false;
                        }
                    );
            }
        }
    };
    cdas: any;
    zones: any;
    parcels: any;
    helper: any;

    constructor(private zoneService: ZonesService,
        private toastr: ToastrService) {
        this.helper = Helper;
    }

    ngOnInit() {
        console.log(this.zoneService);
        this.zoneService.getCDAs().subscribe(cda => {
            // CDA
            this.cdas = this.helper.dataFormatter(cda, false);
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
                            this.zones = this.helper.dataFormatter(zone, false);
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
                            this.toastr.warning(error1.error.message);
                        });
                    }
                },
                onSelectionChanged: (e) => {
                    // Zone
                    console.log(200);
                    if (e.selectedItem) {
                        this.zoneService.getZonesByCDA(e.selectedItem.zone_id).subscribe(zone => {
                            this.zones = this.helper.dataFormatter(zone, false);
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
                                            this.toastr.warning(error1.error.message);
                                        });
                                    }
                                }
                            };
                        }, error1 => {
                            this.toastr.warning(error1.error.message);
                        });
                    }
                }
            };
        }, error1 => {
            this.toastr.warning(error1.error.message);
        });
    }


    editParcel() {
        this.popupVisible = true;
        console.log(this.ilot);
    }

}
