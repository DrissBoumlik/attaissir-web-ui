
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '../../../../shared/shared.module';

import { DragulaModule } from 'ng2-dragula';
import {
    DxTextBoxModule, DxSelectBoxModule, DxTemplateModule, DxPopupModule,
    DxButtonModule, DxLoadPanelModule, DxValidationSummaryModule, DxValidatorModule,
    DxSwitchModule, DxTextAreaModule, DxChartModule, DxLinearGaugeModule, DxProgressBarModule, DxTooltipModule
} from 'devextreme-angular';
import { Widget1Component } from './widget/widget1.component';
import { Widget2Component } from './widget/widget2.component';
import { Widget3Component } from './widget/widget3.component';
import { Widget4Component } from './widget/widget4.component';
import { IndexComponent } from '../index/index.component';
import { IndexDashComponent } from './index.component';
import { SearchPipe } from './search.pipe.component';
import { Widget5Component } from './widget/widget5.component';
import { CounterUpModule } from 'angular4-counter-up';
import { Widget6Component } from './widget/widget6.component';
import { Widget7Component } from './widget/widget7.component';




const routes: Routes = [
    {
        'path': '',
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


        CounterUpModule.forRoot({
            delay: 1,
            time: 1
        }),

        DxTextAreaModule,
        DxSwitchModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxLoadPanelModule,
        LayoutModule,
        DxChartModule,
        DxLinearGaugeModule,

        DxProgressBarModule,
        DxTooltipModule,
        DragulaModule.forRoot()

    ],
    exports: [
        RouterModule,
        IndexDashComponent
    ], declarations: [
        SearchPipe,
        IndexDashComponent,
        Widget1Component,
        Widget2Component,
        Widget3Component,
        Widget4Component,
        Widget5Component,
        Widget6Component,
        Widget7Component
    ]
})
export class DashboardModule {

}
