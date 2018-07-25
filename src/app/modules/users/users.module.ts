import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddComponent } from './components/add/add.component';

import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [AddComponent, ListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
