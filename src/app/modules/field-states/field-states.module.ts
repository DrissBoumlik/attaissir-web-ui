import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldStatesRoutingModule } from './field-states-routing.module';
import { ListComponent } from './list/list.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FieldStatesRoutingModule,
    DxDataGridModule
  ],
  declarations: [ListComponent]
})
export class FieldStatesModule { }
