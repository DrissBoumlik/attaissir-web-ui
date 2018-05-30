import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { WizardComponent } from './components/wizard/wizard.component';
import {ArchwizardModule} from 'angular-archwizard';
import {ThirdsModule} from '../thirds/thirds.module';
import {ListContractComponent} from './components/list-contract/list-contract.component';
import {DxDataGridModule, DxTemplateModule} from 'devextreme-angular';
import {ContractsService} from './services/contracts.service';

@NgModule({
  imports: [
    CommonModule,
    ArchwizardModule,
    ThirdsModule,
    ContractsRoutingModule,
    DxDataGridModule,
    DxTemplateModule
  ],
  exports: [
    DxDataGridModule,
    DxTemplateModule
  ],
  declarations: [
    ListContractComponent,
    WizardComponent,
  ],
  providers: [ContractsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsModule { }
