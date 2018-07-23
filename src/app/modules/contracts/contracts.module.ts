import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { ListCurrentComponent } from './components/list-current/list-current.component';
import {DxFileUploaderModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule} from 'devextreme-angular';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ContractsRoutingModule,
    DxSelectBoxModule,
    DxFileUploaderModule,
    DxTextAreaModule,
    DxTemplateModule
  ],
  declarations: [
    ListComponent,
    ListCurrentComponent,
    ShowComponent,
    AddComponent,
    EditComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsModule {
}
