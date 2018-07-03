import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { WizardComponent } from './components/wizard/wizard.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxListModule, DxTextBoxModule } from 'devextreme-angular';
import { TiersFormComponent } from './components/tiers-form/tiers-form.component';
import { FormsModule } from '@angular/forms';
import { ConseilleComponent } from './components/conseille/conseille.component';
import { CommandeComponent } from './components/commande/commande.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';

@NgModule({
  imports: [
    CommonModule,
    ArchwizardModule,
    DxFormModule,
    DxListModule,
    DxButtonModule,
    DxDataGridModule,
    DxTextBoxModule,
    FormsModule
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
    WarehouseComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    WizardComponent,
    TiersFormComponent,
    CommandeComponent,
    ConseilleComponent,
    WarehouseComponent]
})
export class SharedModule { }
