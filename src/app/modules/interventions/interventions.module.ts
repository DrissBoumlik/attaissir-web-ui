import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionsRoutingModule } from './interventions-routing.module';
import { NewComponent } from './components/new/new.component';
import {
    DxButtonModule, DxCheckBoxModule, DxDataGridModule,
    DxDateBoxModule,
    DxFormModule, DxListModule, DxLoadPanelModule, DxPopupModule,
    DxSelectBoxModule, DxSwitchModule, DxTagBoxModule,
    DxTemplateModule,
    DxTextAreaModule,

    DxTextBoxModule, DxTileViewModule,
    DxTreeListModule, DxValidationSummaryModule, DxValidatorModule
} from 'devextreme-angular';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../../shared/shared.module';
import { AddTempleteComponent } from './components/add-templete/add-templete.component';
import { ListComponent } from './components/list/list.component';

import { EditComponent } from './components/edit/edit.component';
import { EtatDirective } from '../../shared/directives/etat.directive';
import { LayoutModule } from '../../theme/layouts/layout.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InterventionsRoutingModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxDateBoxModule,
        DxDataGridModule,
        DxPopupModule,
        DxButtonModule,
        DxTileViewModule,
        DxTemplateModule,
        DxLoadPanelModule,
        DxSwitchModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxCheckBoxModule,
        DxTreeListModule,
        DxTextBoxModule,
        DxTextBoxModule,
        LayoutModule,
        DxTextBoxModule,
        DxLoadPanelModule,
        LayoutModule
    ],
    declarations: [NewComponent, AddComponent, AddTempleteComponent, ListComponent, EtatDirective, EditComponent]

})
export class InterventionsModule {
}
