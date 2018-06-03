import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { FormRepeaterComponent } from './form-repeater/form-repeater.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxListModule } from 'devextreme-angular';
import { ThirdsModule } from '../thirds/thirds.module';

@NgModule({
  imports: [
    ThirdsModule,
    CommonModule,
    ArchwizardModule,
    DxFormModule,
    DxListModule,
    DxButtonModule,
    DxDataGridModule
  ],
  exports: [
    WizardComponent,
    ArchwizardModule,
    DxListModule,
    DxFormModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FormRepeaterComponent, WizardComponent]
})
export class SharedModule { }
