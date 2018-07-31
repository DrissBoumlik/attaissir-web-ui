import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { ListComponent } from './components/list/list.component';
import { DxDataGridModule, DxTextAreaModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    IncidentsRoutingModule
  ],
  declarations: [ListComponent],
})
export class IncidentsModule { }
