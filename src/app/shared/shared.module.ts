import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { WizardComponent } from './components/wizard/wizard.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule, DxFileUploaderModule,
  DxFormModule,
  DxListModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule, DxTextAreaModule,
  DxTextBoxModule
} from 'devextreme-angular';
import { TiersFormComponent } from './components/tiers-form/tiers-form.component';
import { FormsModule } from '@angular/forms';
import { ConseilleComponent } from './components/conseille/conseille.component';
import { CommandeComponent } from './components/commande/commande.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { RfidCardReaderComponent } from './components/rfid-card-reader/rfid-card-reader.component';
import { ParcelsListComponent } from './components/parcels-list/parcels-list.component';
import { RoleDirective } from './directives/role.directive';
import { ParcelGridComponent } from './components/parcel-grid/parcel-grid.component';
import { PermissionDirective } from './directives/permission.directive';

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
    DxPopupModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
  ],
  exports: [
    WizardComponent,
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
    WarehouseComponent,
    DxPopupModule,
    DxTemplateModule,
    RfidCardReaderComponent,
    DxFileUploaderModule,
    ParcelGridComponent,
    ParcelsListComponent,
    PermissionDirective
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
    PermissionDirective
  ]
})
export class SharedModule { }
