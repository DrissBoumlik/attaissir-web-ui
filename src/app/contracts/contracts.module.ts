import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ContractsRoutingModule} from './contracts-routing.module';
import {WizardComponent} from './components/wizard/wizard.component';
import {ArchwizardModule} from 'angular-archwizard';
import {ThirdsModule} from '../thirds/thirds.module';
import {ListContractComponent} from './components/list-contract/list-contract.component';
import {DxButtonModule, DxDataGridModule, DxListModule, DxPopupModule, DxTemplateModule} from 'devextreme-angular';
import {ContractsService} from './services/contracts.service';
import {DetailContractComponent} from './components/detail-contract/detail-contract.component';


@NgModule({
  imports: [
    CommonModule,
    ArchwizardModule,
    ThirdsModule,
    ContractsRoutingModule,
    DxTemplateModule,
    DxListModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
  ],
  exports: [
    DxTemplateModule,
    DxListModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
  ],
  declarations: [
    WizardComponent,
    ListContractComponent,
    DetailContractComponent
  ],
  providers: [ContractsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsModule {
}
