import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { ListComponent } from './components/list/list.component';
import {DxButtonModule, DxDataGridModule, DxNumberBoxModule, DxTextAreaModule} from 'devextreme-angular';
import { ReplenishmentComponent } from './components/replenishment/replenishment.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    StockRoutingModule,
    DxDataGridModule,
    DxTextAreaModule,
    DxNumberBoxModule,
    DxButtonModule,
    FormsModule
  ],
  declarations: [ListComponent, ReplenishmentComponent]
})
export class StockModule { }
