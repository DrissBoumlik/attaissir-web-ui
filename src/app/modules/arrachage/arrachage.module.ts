import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrachageRoutingModule } from './arrachage-routing.module';
import { ConvoationListComponent } from './components/convoation-list/convoation-list.component';
import {
    DxBoxModule,
    DxButtonModule, DxChartModule,
    DxDataGridModule,
    DxDateBoxModule, DxFileUploaderModule,
    DxFormModule, DxListModule,
    DxLoadPanelModule,
    DxNumberBoxModule,
    DxPopupModule, DxScrollViewModule, DxSwitchModule, DxTileViewModule
} from 'devextreme-angular';
import { EchantillonnageListComponent } from './components/echantillonnage-list/echantillonnage-list.component';
import { EchantillonnageShowComponent } from './components/echantillonnage-show/echantillonnage-show.component';
import { FormsModule } from '@angular/forms';
import { ChargementAffectationListComponent } from './components/chargement-affectation-list/chargement-affectation-list.component';
import { EncodageLisComponent } from './components/encodage-lis/encodage-lis.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RotationsListComponent } from './components/rotations-list/rotations-list.component';
import { TruckLineupComponent } from './components/truck-lineup/truck-lineup.component';
import { RotationsInprogressListComponent } from './components/rotations-inprogress-list/rotations-inprogress-list.component';
import { RotationsAwaitingListComponent } from './components/rotations-awaiting-list/rotations-awaiting-list.component';
import {TruckSvgComponent} from '../../shared/components/truck-svg/truck-svg.component';
import {TruckSvgsGreenComponent} from '../../shared/components/truck-svgs-green/truck-svgs-green.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ArrachageRoutingModule,
        DxDataGridModule,
        DxButtonModule,
        DxFormModule,
        DxPopupModule,
        FormsModule,
        DxNumberBoxModule,
        DxDateBoxModule,
        DxSwitchModule,
        DxFileUploaderModule,
        DxListModule,
        DxScrollViewModule,
        DxChartModule,
        DxBoxModule,
        DxLoadPanelModule,
        DxTileViewModule,
        SharedModule
    ],
    declarations: [ConvoationListComponent, EchantillonnageListComponent, EchantillonnageShowComponent, ChargementAffectationListComponent, EncodageLisComponent, OrderListComponent, RotationsListComponent, TruckLineupComponent, RotationsInprogressListComponent, RotationsAwaitingListComponent]
})
export class ArrachageModule { }
