import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionsRoutingModule } from './interventions-routing.module';
import { NewComponent } from './components/new/new.component';
import {
  DxButtonModule, DxCheckBoxModule, DxDataGridModule,
  DxDateBoxModule,
  DxFormModule, DxLoadPanelModule, DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTextBoxModule
} from 'devextreme-angular';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../../shared/shared.module';
import { MouvementsRoutingModule } from '../mouvements/mouvements-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InterventionsRoutingModule,
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
  declarations: [NewComponent, AddComponent]
})
export class InterventionsModule { }
