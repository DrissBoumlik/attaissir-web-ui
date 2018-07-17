import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelsRoutingModule } from './parcels-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { AddComponent } from './components/add/add.component';
import {InterventionsRoutingModule} from '../interventions/interventions-routing.module';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule, DxLoadPanelModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextAreaModule
} from 'devextreme-angular';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ParcelsRoutingModule,

    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule,
    DxLoadPanelModule,
    DxCheckBoxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ListComponent, AddComponent]
})
export class ParcelsModule { }
