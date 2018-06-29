import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConseilleAgricoleRoutingModule } from './conseille-agricole-routing.module';
import {ListComponent} from './components/list/list.component';
import {IndexComponent} from './components/index/index.component';
import {EditComponent} from './components/edit/edit.component';
import {ShowComponent} from './components/show/show.component';
import {AddComponent} from './components/add/add.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ConseilleAgricoleRoutingModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [AddComponent , ListComponent, IndexComponent, EditComponent, ShowComponent]
})
export class ConseilleAgricoleModule { }
