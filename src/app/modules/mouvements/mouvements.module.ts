import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFileUploaderModule, DxPopupModule,
  DxSelectBoxModule, DxTemplateModule,
  DxTextAreaModule
} from 'devextreme-angular';
import {ListComponent} from './components/list/list.component';
import {MouvementsRoutingModule} from './mouvements-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ShowComponent } from './components/show/show.component';

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


    DxPopupModule,
    DxButtonModule,
    DxTemplateModule
  ],
  declarations: [ListComponent, ShowComponent]
})
export class MouvementsModule { }
