import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionCenterRoutingModule } from './distribution-center-routing.module';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { DxDataGridModule, DxTextAreaModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    DistributionCenterRoutingModule,
    DxDataGridModule,
    DxTextAreaModule
  ],
  declarations: [AddComponent, ListComponent]
})
export class DistributionCenterModule { }
