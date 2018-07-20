import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterventionsRoutingModule} from './interventions-routing.module';
import {NewComponent} from './components/new/new.component';
import {
  DxButtonModule, DxCheckBoxModule, DxDataGridModule,
  DxDateBoxModule,
  DxFormModule, DxLoadPanelModule, DxPopupModule,
  DxSelectBoxModule, DxSwitchModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTextBoxModule
} from 'devextreme-angular';
import {AddComponent} from './components/add/add.component';
import {SharedModule} from '../../shared/shared.module';
import {MouvementsRoutingModule} from '../mouvements/mouvements-routing.module';
import {EditComponent} from './components/edit/edit.component';

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
    DxSwitchModule
  ],
  declarations: [NewComponent, AddComponent, EditComponent]
})
export class InterventionsModule {
}

