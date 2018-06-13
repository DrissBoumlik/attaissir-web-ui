import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ThirdsModule } from '../thirds/thirds.module';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent as ListParcelsComponent } from './components/list-parcels/list.component';
import { SharedModule } from '../shared/shared.module';
import { DxCheckBoxModule, DxFileUploaderModule, DxSelectBoxModule } from 'devextreme-angular';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ThirdsModule,
    ContractsRoutingModule,
    DxCheckBoxModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
  ],
  declarations: [
    ListComponent,
    ShowComponent,
    AddComponent,
    EditComponent,
    ListParcelsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsModule {
}
