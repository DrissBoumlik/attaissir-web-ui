import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrachageRoutingModule } from './arrachage-routing.module';
import { ConvoationListComponent } from './components/convoation-list/convoation-list.component';
<<<<<<< HEAD
import {DxButtonModule, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxPopupModule} from 'devextreme-angular';
=======
import { DxButtonModule, DxDataGridModule, DxFormModule, DxLoadPanelModule } from 'devextreme-angular';
>>>>>>> eb1dd42bb78a4d2f7b7e35472b3d6939ba113fa8
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
    DxPopupModule,
    FormsModule,
    DxLoadPanelModule
  ],
  declarations: [ConvoationListComponent, EchantillonnageListComponent, EchantillonnageShowComponent, ChargementAffectationListComponent]
})
export class ArrachageModule { }
