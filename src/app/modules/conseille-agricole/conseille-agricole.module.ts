import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConseilleAgricoleRoutingModule } from './conseille-agricole-routing.module';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    ConseilleAgricoleRoutingModule
  ],
  declarations: [AddComponent]
})
export class ConseilleAgricoleModule { }
