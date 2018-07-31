import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

<<<<<<< HEAD
import {RolesRoutingModule} from './roles-routing.module';
import {AddComponent} from './components/add/add.component';
import {SharedModule} from '../../shared/shared.module';
import {DxSelectBoxModule} from 'devextreme-angular';
import { ListComponent } from './components/list/list.component';
import { EditeComponent } from './components/edite/edite.component';
=======
import { RolesRoutingModule } from './roles-routing.module';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../../shared/shared.module';
import { DxSelectBoxModule } from 'devextreme-angular';
>>>>>>> adc58d46d988724fe71a715f28c131e5fb65b466

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
