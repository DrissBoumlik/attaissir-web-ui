import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxButtonModule, DxListModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTreeViewModule} from 'devextreme-angular';

import {SharedModule} from '../../shared/shared.module';
import {UsersRoutingModule} from './users-routing.module';

import {AddComponent} from './components/add/add.component';
import {ListComponent} from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule,
    DxSelectBoxModule,
    DxTreeViewModule,
    DxListModule,
    DxTemplateModule,
    DxPopupModule,
    DxButtonModule
  ],
  declarations: [AddComponent, ListComponent, EditComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {
}
