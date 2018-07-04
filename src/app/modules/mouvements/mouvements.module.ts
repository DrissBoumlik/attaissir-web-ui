import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxSelectBoxModule, DxTextAreaModule} from 'devextreme-angular';
import {ListComponent} from './components/list/list.component';
import {MouvementsRoutingModule} from './mouvements-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    MouvementsRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule
  ],
  declarations: [ListComponent]
})
export class MouvementsModule { }
