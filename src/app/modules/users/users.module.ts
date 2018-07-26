import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {AddComponent} from './components/add/add.component';
import {ListComponent} from './components/list/list.component';
import {SharedModule} from '../../shared/shared.module';
import {DxSelectBoxModule} from 'devextreme-angular';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule,
    DxSelectBoxModule
  ],
  declarations: [AddComponent, ListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {
}
