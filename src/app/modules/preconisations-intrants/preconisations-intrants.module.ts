import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { PreconisationsIntrantsRoutingModule } from './preconisations-intrants-routing.module';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTextBoxModule
} from 'devextreme-angular';
import { ShowComponent } from './components/show/show.component';
import { PrecoAvanceListComponent } from './components/preco-avance-list/preco-avance-list.component';
import { DetailsComponent } from './components/details/details.component';



@NgModule({
  imports: [
    CommonModule,

    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule, DxTextBoxModule,
    PreconisationsIntrantsRoutingModule
  ],
  declarations: [
    ListComponent,
    ShowComponent,
    PrecoAvanceListComponent,
    DetailsComponent
  ]
})
export class PreconisationsIntrantsModule { }
