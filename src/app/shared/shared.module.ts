import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { WizardComponent } from './components/wizard/wizard.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxListModule, DxTextBoxModule } from 'devextreme-angular';
import { TiersFormComponent } from './components/tiers-form/tiers-form.component';
import { FormsModule } from '@angular/forms';
import {ConseilleComponent} from './components/conseille/conseille.component';

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
    ArchwizardModule,
    FormsModule,
    DxListModule,
    DxFormModule,
    DxDataGridModule,
    DxButtonModule,
    ConseilleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    WizardComponent,
    TiersFormComponent,
    ConseilleComponent]
})
export class SharedModule { }
