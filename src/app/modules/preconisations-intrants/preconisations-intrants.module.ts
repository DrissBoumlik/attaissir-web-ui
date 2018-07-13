import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from './components/list/list.component';
import {PreconisationsIntrantsRoutingModule} from './preconisations-intrants-routing.module';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextAreaModule
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,

    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule,

    PreconisationsIntrantsRoutingModule
  ],
  declarations: [
    ListComponent
  ]
})
export class PreconisationsIntrantsModule { }
