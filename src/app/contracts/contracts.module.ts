import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { WizardComponent } from './components/wizard/wizard.component';
import {ArchwizardModule} from 'angular-archwizard';
import {ThirdsModule} from '../thirds/thirds.module';
import {ListContractComponent} from './components/list-contract/list-contract.component';
import {DxDataGridModule} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    ArchwizardModule,
    ThirdsModule,
    ContractsRoutingModule,
    DxDataGridModule,
  ],
  declarations: [
    WizardComponent,
    ListContractComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsModule { }
