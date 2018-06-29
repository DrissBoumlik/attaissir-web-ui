import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConseilleAgricoleRoutingModule } from './conseille-agricole-routing.module';
import { AddComponent } from './add/add.component';
import {ListComponent} from './components/list/list.component';
import {IndexComponent} from './components/index/index.component';
import {EditComponent} from './components/edit/edit.component';
import {ShowComponent} from './components/show/show.component';

@NgModule({
  imports: [
    CommonModule,
    ConseilleAgricoleRoutingModule
  ],
  declarations: [AddComponent , ListComponent, IndexComponent, EditComponent, ShowComponent]
})
export class ConseilleAgricoleModule { }
