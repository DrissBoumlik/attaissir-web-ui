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
  DxTextBoxModule
} from 'devextreme-angular';
import {AddComponent} from './components/add/add.component';
import {SharedModule} from '../../shared/shared.module';
import {DxiItemModule} from 'devextreme-angular/ui/nested/item-dxi';
import {DxiGroupItemModule} from 'devextreme-angular/ui/nested/group-item-dxi';

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
    DxSwitchModule,
    DxTagBoxModule,
    DxListModule,
    DxiItemModule,
    DxiGroupItemModule,
    DxFormModule,
    DxTextBoxModule,
  ],
  declarations: [NewComponent, AddComponent]
})
export class InterventionsModule { }
