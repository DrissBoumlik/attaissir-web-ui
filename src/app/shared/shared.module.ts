import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { WizardComponent } from './components/wizard/wizard.component';
import {
  DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxListModule, DxPopupModule, DxTemplateModule,
  DxTextBoxModule
} from 'devextreme-angular';
import { TiersFormComponent } from './components/tiers-form/tiers-form.component';
import { FormsModule } from '@angular/forms';
import { ConseilleComponent } from './components/conseille/conseille.component';
import { CommandeComponent } from './components/commande/commande.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { RfidCardReaderComponent } from './components/rfid-card-reader/rfid-card-reader.component';
import { ParcelsListComponent } from './components/parcels-list/parcels-list.component';

@NgModule({
  imports: [
    CommonModule,
    ArchwizardModule,
    DxFormModule,
    DxListModule,
    DxButtonModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxDateBoxModule,
    FormsModule,
    DxPopupModule,
    DxTemplateModule
  ],
  exports: [
    WizardComponent,
    TiersFormComponent,
    CommandeComponent,
    ArchwizardModule,
    FormsModule,
    DxListModule,
    DxFormModule,
    DxButtonModule,
    DxDataGridModule,
    ConseilleComponent,
    WarehouseComponent,
    RfidCardReaderComponent,
    ParcelsListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    WizardComponent,
    TiersFormComponent,
    CommandeComponent,
    ConseilleComponent,
    WarehouseComponent,
    RfidCardReaderComponent,
    ParcelsListComponent]
})
export class SharedModule { }
