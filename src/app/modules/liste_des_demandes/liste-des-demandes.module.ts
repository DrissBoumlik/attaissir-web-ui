import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import {DxDataGridModule, DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule} from 'devextreme-angular';
import {SharedModule} from '../../shared/shared.module';
import {List_des_demandesRoutingModule} from './list_des_demandes-routing.module';
import {ShowComponent} from './components/show/show.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    List_des_demandesRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule
  ],
  exports: [
    SharedModule,
    CommonModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule
  ],
  declarations: [ListComponent, ShowComponent]
})
export class ListeDesDemandesModule { }
