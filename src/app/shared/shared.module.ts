import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchwizardModule} from 'angular-archwizard';
import {WizardComponent} from './components/wizard/wizard.component';
import {
    DxBoxModule,
    DxButtonModule, DxCircularGaugeModule, DxContextMenuModule,
    DxDataGridModule,
    DxDateBoxModule, DxFileUploaderModule,
    DxFormModule, DxLinearGaugeModule,
    DxListModule, DxLoadPanelModule, DxMenuModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxSelectBoxModule, DxSliderModule, DxTabPanelModule,
    DxTemplateModule, DxTextAreaModule,
    DxTextBoxModule, DxVectorMapModule
} from 'devextreme-angular';
import {TiersFormComponent} from './components/tiers-form/tiers-form.component';
import {FormsModule} from '@angular/forms';
import {ConseilleComponent} from './components/conseille/conseille.component';
import {CommandeComponent} from './components/commande/commande.component';
import {WarehouseComponent} from './components/warehouse/warehouse.component';
import {RfidCardReaderComponent} from './components/rfid-card-reader/rfid-card-reader.component';
import {ParcelsListComponent} from './components/parcels-list/parcels-list.component';
import {RoleDirective} from './directives/role.directive';
import {ParcelGridComponent} from './components/parcel-grid/parcel-grid.component';
import {PermissionDirective} from './directives/permission.directive';
import {LeafLetHomeComponent} from './leaflet/maps/home/home.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {KpisComponent} from './components/kpis/kpis.component';
import {CdaSigaaComponent} from './components/cda-sigaa/cda-sigaa.component';
import {ParcelInfoComponent} from './components/parcel-info/parcel-info.component';
import {ClarityModule} from '@clr/angular';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import {MapWidgetInfoComponent} from './components/map-widget-info/map-widget-info.component';
import {TruckSvgComponent} from './components/truck-svg/truck-svg.component';
import {TruckSvgsGreenComponent} from './components/truck-svgs-green/truck-svgs-green.component';

@NgModule({
    imports: [
        CommonModule,
        ArchwizardModule,
        DxFormModule,
        DxListModule,
        DxButtonModule,
        DxNumberBoxModule,
        DxDataGridModule,
        DxTextBoxModule,
        DxDateBoxModule,
        FormsModule,
        DxTextAreaModule,
        DxTabPanelModule,
        DxCircularGaugeModule,
        DxLinearGaugeModule,
        DxSliderModule,
        DxPopupModule,
        DxTemplateModule,
        DxFileUploaderModule,
        DxSelectBoxModule,
        DxLoadPanelModule,
        DxVectorMapModule,
        DxBoxModule,
        DxMenuModule,
        DxContextMenuModule,
        ClarityModule,
        LeafletModule.forRoot(),
        LeafletDrawModule.forRoot(),
        LeafletMarkerClusterModule
    ],
    exports: [
        WizardComponent,
        TruckSvgsGreenComponent,
        TruckSvgComponent,
        TiersFormComponent,
        CommandeComponent,
        ArchwizardModule,
        FormsModule,
        DxListModule,
        DxFormModule,
        DxTextAreaModule,
        DxButtonModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxNumberBoxModule,
        ConseilleComponent,
        DxDateBoxModule,
        DxContextMenuModule,
        DxLinearGaugeModule,
        DxSliderModule,
        WarehouseComponent,
        DxPopupModule,
        DxTemplateModule,
        DxTabPanelModule,
        DxCircularGaugeModule,
        RfidCardReaderComponent,
        DxFileUploaderModule,
        ParcelGridComponent,
        DxLoadPanelModule,
        ParcelsListComponent,
        PermissionDirective,
        LeafLetHomeComponent,
        KpisComponent,
        DxMenuModule,
        ClarityModule,
        DxBoxModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        WizardComponent,
        TiersFormComponent,
        CommandeComponent,
        ConseilleComponent,
        WarehouseComponent,
        RfidCardReaderComponent,
        ParcelsListComponent,
        RoleDirective,
        ParcelGridComponent,
        PermissionDirective,
        LeafLetHomeComponent,
        KpisComponent,
        CdaSigaaComponent,
        ParcelInfoComponent,
        MapWidgetInfoComponent,
        TruckSvgComponent,
        TruckSvgsGreenComponent
    ]
})
export class SharedModule {
}
