import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '../../../../shared/shared.module';

import {DragulaModule} from "ng2-dragula/index";
import { DxTextBoxModule, DxSelectBoxModule, DxTemplateModule, DxPopupModule, DxButtonModule, DxLoadPanelModule, DxValidationSummaryModule, DxValidatorModule, DxSwitchModule, DxTextAreaModule, DxChartModule, DxLinearGaugeModule } from 'devextreme-angular';
import { Widget1Component } from './widget/widget1.component';
import { Widget2Component } from './widget/widget2.component';
import { Widget3Component } from './widget/widget3.component';
import { Widget4Component } from './widget/widget4.component';
import {IndexDashComponent} from './index.component';
import {IndexComponent} from '../index/index.component';




const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': '',
        'component': IndexComponent,
      },
    ],
  },
];


@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule, SharedModule,



    DxSelectBoxModule,
    DxTemplateModule,
    DxPopupModule,
    DxButtonModule,
    DxLoadPanelModule,
    DxTextBoxModule,



    DxTextAreaModule,
    DxSwitchModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxLoadPanelModule,
    LayoutModule,
    DxChartModule,
    DxLinearGaugeModule,

    DragulaModule
  ],
  exports: [
    RouterModule,
    IndexDashComponent
  ], declarations: [
    IndexDashComponent,
    Widget1Component ,
     Widget2Component,
     Widget3Component,
     Widget4Component
  ]
})
export class DashboardModule {

}
