import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrachageRoutingModule } from './arrachage-routing.module';
import { ConvoationListComponent } from './components/convoation-list/convoation-list.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxLoadPanelModule } from 'devextreme-angular';
import { EchantillonnageListComponent } from './components/echantillonnage-list/echantillonnage-list.component';
import { EchantillonnageShowComponent } from './components/echantillonnage-show/echantillonnage-show.component';
import { FormsModule } from '@angular/forms';
import { ChargementAffectationListComponent } from './components/chargement-affectation-list/chargement-affectation-list.component';

@NgModule({
  imports: [
    CommonModule,
    ArrachageRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    FormsModule,
    DxLoadPanelModule
  ],
  declarations: [ConvoationListComponent, EchantillonnageListComponent, EchantillonnageShowComponent, ChargementAffectationListComponent]
})
export class ArrachageModule { }
