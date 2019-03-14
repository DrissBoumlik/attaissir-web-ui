import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ContractsComponent } from './contracts/contracts.component';
import {
    DxBoxModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule, DxDateBoxModule,
    DxLoadPanelModule,
    DxSelectBoxModule
} from 'devextreme-angular';
import { ReportingComponent } from './reporting';
import { PreconisationsComponent } from './preconisations/preconisations.component';
import { CardsComponent } from './cards/cards.component';
import { MouvementsComponent } from './mouvements/mouvements.component';
import { IlotsComponent } from './ilots/ilots.component';
import { HourlyReceptionComponent } from './harvest/cane/hourly-reception/hourly-reception.component';
import { DxoArgumentAxisModule } from 'devextreme-angular/ui/nested/argument-axis';
import { DxoArgumentFormatModule } from 'devextreme-angular/ui/nested/argument-format';
import { HourlyReceptionCdaComponent } from './harvest/cane/hourly-reception-cda/hourly-reception-cda.component';

@NgModule({
    imports: [
        CommonModule,
        ReportingRoutingModule,
        DxDataGridModule,
        DxBoxModule,
        DxDateBoxModule,
        DxSelectBoxModule,
        DxLoadPanelModule,
        DxButtonModule,
        DxChartModule,
        DxoArgumentAxisModule,
        DxoArgumentFormatModule
    ],
    declarations: [ReportingComponent, ContractsComponent, PreconisationsComponent, CardsComponent, MouvementsComponent, IlotsComponent, HourlyReceptionComponent, HourlyReceptionCdaComponent]
})
export class ReportingModule { }
