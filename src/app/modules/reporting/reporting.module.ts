import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ContractsComponent } from './contracts/contracts.component';
import {
    DxBoxModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxSelectBoxModule
} from 'devextreme-angular';
import { ReportingComponent } from './reporting';
import { PreconisationsComponent } from './preconisations/preconisations.component';
import { CardsComponent } from './cards/cards.component';
import { MouvementsComponent } from './mouvements/mouvements.component';
import { IlotsComponent } from './ilots/ilots.component';
import { HourlyReceptionComponent } from './harvest/cane/hourly-reception/hourly-reception.component';

@NgModule({
    imports: [
        CommonModule,
        ReportingRoutingModule,
        DxDataGridModule,
        DxBoxModule,
        DxSelectBoxModule,
        DxLoadPanelModule,
        DxButtonModule,
        DxChartModule
    ],
    declarations: [ReportingComponent, ContractsComponent, PreconisationsComponent, CardsComponent, MouvementsComponent, IlotsComponent, HourlyReceptionComponent]
})
export class ReportingModule { }
