import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterventionsRoutingModule } from './interventions-routing.module';
import { NewComponent } from './components/new/new.component';
import {
  DxButtonModule,
  DxDateBoxModule, DxFormModule, DxLoadPanelModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule,
  NestedOptionHost
} from 'devextreme-angular';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    InterventionsRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxFormModule,
    DxDateBoxModule,
    DxButtonModule,
    SharedModule,
    DxLoadPanelModule,
    RouterModule,
  ],
  declarations: [NewComponent]
})
export class InterventionsModule { }
