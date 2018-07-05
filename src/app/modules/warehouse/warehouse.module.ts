import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {DxDataGridModule, DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule} from 'devextreme-angular';
import {ShowComponent} from './components/show/show.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';
import {EditComponent} from './components/edit/edit.component';
import {WarehouseRoutingModule} from './warehouse-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    WarehouseRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule
  ],
  declarations: [AddComponent, EditComponent, ListComponent, ShowComponent]
})

export class WarehouseModule { }
