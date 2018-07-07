import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { DxButtonModule, DxSelectBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CardsRoutingModule,
    DxSelectBoxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ListComponent]
})
export class CardsModule { }
