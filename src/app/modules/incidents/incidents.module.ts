import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import {IncidentService} from './services/incidents';
import {DxDataGridModule, DxTextAreaModule} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    DxDataGridModule,
    DxTextAreaModule
  ],
  declarations: [AddComponent, ListComponent],
  providers: [IncidentService]
})
export class IncidentsModule { }
