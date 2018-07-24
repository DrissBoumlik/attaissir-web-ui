import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFileUploaderModule, DxNumberBoxModule, DxPopupModule,
  DxSelectBoxModule, DxTemplateModule,
  DxTextAreaModule
} from 'devextreme-angular';
import { ListComponent } from './components/list/list.component';
import { MouvementsRoutingModule } from './mouvements-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddComponent } from './components/add/add.component';
import { ShowComponent } from './components/show/show.component';
import { MystockComponent } from './components/mystock/mystock.component';
import { ShowRetourComponent } from './components/show-retour/show-retour.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    MouvementsRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxNumberBoxModule,

    DxPopupModule,
    DxButtonModule,
    DxTemplateModule
  ],

  declarations: [ListComponent, AddComponent, ShowComponent, MystockComponent, ShowRetourComponent]
})
export class MouvementsModule { }
