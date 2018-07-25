import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { DxFormModule } from '../../../../node_modules/devextreme-angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [AddComponent, ListComponent]
})
export class UsersModule { }
