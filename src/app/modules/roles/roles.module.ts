import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../../shared/shared.module';
import { DxSelectBoxModule } from 'devextreme-angular';
import { ListComponent } from './components/list/list.component';
import { EditeComponent } from './components/edite/edite.component';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    DxSelectBoxModule
  ],
  declarations: [AddComponent, ListComponent, EditeComponent]
})
export class RolesModule {
}
