import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { ListComponent } from './components/list/list.component';
import {
    DxButtonModule, DxChartModule, DxDataGridModule, DxLoadPanelModule, DxNumberBoxModule,
    DxTextAreaModule
} from 'devextreme-angular';
import { ReplenishmentComponent } from './components/replenishment/replenishment.component';
import { FormsModule } from '@angular/forms';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../../shared/shared.module';
import {ClarityModule} from '@clr/angular';

@NgModule({
    imports: [
        CommonModule,
        StockRoutingModule,
        DxDataGridModule,
        DxTextAreaModule,
        DxNumberBoxModule,
        DxButtonModule,
        ClarityModule,
        FormsModule,
        DxChartModule,
        DxLoadPanelModule
    ],
    declarations: [ListComponent, ReplenishmentComponent, BoardComponent]
})
export class StockModule { }
