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

  DxTextBoxModule,
  DxTreeListModule, DxValidationSummaryModule, DxValidatorModule
} from 'devextreme-angular';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../../shared/shared.module';
import { DxiItemModule } from 'devextreme-angular/ui/nested/item-dxi';
import { DxiGroupItemModule } from 'devextreme-angular/ui/nested/group-item-dxi';
import { MouvementsRoutingModule } from '../mouvements/mouvements-routing.module';
import { AddTempleteComponent } from './components/add-templete/add-templete.component';
import { ListComponent } from './components/list/list.component';

import { EditComponent } from './components/edit/edit.component';
import { EtatDirective } from '../../shared/directives/etat.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InterventionsRoutingModule,
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
    DxTextBoxModule,
    DxSwitchModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxCheckBoxModule,
    DxTreeListModule,
    DxTextBoxModule
  ],
  declarations: [NewComponent, AddComponent, AddTempleteComponent, ListComponent, EtatDirective, EditComponent]

})
export class InterventionsModule {
}
