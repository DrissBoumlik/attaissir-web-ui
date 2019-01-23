import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DxDataGridModule, DxDateBoxModule, DxLoadIndicatorModule, DxSelectBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { ShowComponent } from './components/show/show.component';
import { ListComponent } from '../thirds/components/warehouse-list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { ReplenishmentComponent } from './components/replenishment/replenishment.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        WarehouseRoutingModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxDateBoxModule,
        DxDataGridModule,
        DxLoadIndicatorModule
    ],
    declarations: [AddComponent, EditComponent, ListComponent, ShowComponent, ReplenishmentComponent]
})

export class WarehouseModule { }
