import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterventionsRoutingModule } from './interventions-routing.module';
import { NewComponent } from './components/new/new.component';
import {
  DxButtonModule,
  DxDateBoxModule, DxFormModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule,
  NestedOptionHost
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    InterventionsRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxFormModule,
    DxDateBoxModule,
    DxButtonModule
  ],
  declarations: [NewComponent]
})
export class InterventionsModule { }
