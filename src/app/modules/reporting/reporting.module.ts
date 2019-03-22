import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ContractsComponent } from './contracts/contracts.component';
import {
    DxBoxModule,
    DxButtonModule,
    DxChartModule,
    DxDataGridModule, DxDateBoxModule, DxFormModule,
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
import { ParcelRidelleHistoryComponent } from './harvest/general/parcel-ridelle-history/parcel-ridelle-history.component';
import {FormsModule} from '@angular/forms';
import { AlocationsAndReturnsComponent } from './alocations-and-returns/alocations-and-returns.component';
import { NetDistributionByReceiptComponent } from './net-distribution-by-receipt/net-distribution-by-receipt.component';

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
        DxFormModule,
        FormsModule,
        DxoArgumentAxisModule,
        DxoArgumentFormatModule
    ],
    declarations: [ReportingComponent, ContractsComponent, PreconisationsComponent, CardsComponent, MouvementsComponent, IlotsComponent, HourlyReceptionComponent, HourlyReceptionCdaComponent, ParcelRidelleHistoryComponent, AlocationsAndReturnsComponent, NetDistributionByReceiptComponent]
})
export class ReportingModule { }
