import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartographieRoutingModule } from './cartographie-routing.module';
import { SuiviComponent } from './suivi/suivi.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CartographieRoutingModule,
    SharedModule
  ],
  declarations: [SuiviComponent]
})
export class CartographieModule { }
