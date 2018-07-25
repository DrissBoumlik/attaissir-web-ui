import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule
  ],
  declarations: [AddComponent]
})
export class RolesModule { }
