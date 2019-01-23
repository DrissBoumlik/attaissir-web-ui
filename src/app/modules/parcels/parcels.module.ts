import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelsRoutingModule } from './parcels-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { AddComponent } from './components/add/add.component';
import { InterventionsRoutingModule } from '../interventions/interventions-routing.module';
import {
    DxBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxDateBoxModule, DxLoadPanelModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxTextAreaModule
} from 'devextreme-angular';
import { ShowComponent } from './components/show/show.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ParcelsRoutingModule,

        DxSelectBoxModule,
        DxTextAreaModule,
        DxDateBoxModule,
        DxDataGridModule,
        DxButtonModule,
        DxPopupModule,
        DxButtonModule,
        DxTemplateModule,
        DxLoadPanelModule,
        DxCheckBoxModule,
        DxBoxModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ListComponent, AddComponent, ShowComponent]
})
export class ParcelsModule { }
