import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ThirdsModule } from '../thirds/thirds.module';
import { ListContractComponent } from './components/list-contract/list-contract.component';
import {
  DxDataGridModule, DxFileUploaderModule, DxLookupModule, DxPopupModule, DxSelectBoxModule,
  DxTemplateModule
} from 'devextreme-angular';
import { ContractsService } from './services/contracts.service';
import { DetailContractComponent } from './components/detail-contract/detail-contract.component';
import { AvenantComponent } from './components/avenant/avenant.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { SharedModule } from '../shared/shared.module';
import { CardsComponent } from './components/cards/cards.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ThirdsModule,
    ContractsRoutingModule,
    DxTemplateModule,
    DxDataGridModule,
    DxPopupModule,
    DxLookupModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
  ],
  exports: [
    DxTemplateModule,
    DxDataGridModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
  ],
  declarations: [
    ListContractComponent,
    DetailContractComponent,
    AvenantComponent,
    AddComponent,
    EditComponent,
    CardsComponent,
  ],
  providers: [ContractsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsModule {
}
