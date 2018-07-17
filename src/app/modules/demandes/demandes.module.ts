import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DxDataGridModule, DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { DemandesRoutingModule } from './demandes-routing.module';
import { ShowComponent } from './components/show/show.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    DemandesRoutingModule,
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
export class DemandesModule { }
