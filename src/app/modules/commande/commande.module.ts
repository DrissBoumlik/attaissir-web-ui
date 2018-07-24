import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { CommandeRoutingModule } from './commande-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CommandeRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule
  ],
  declarations: [AddComponent, EditComponent, ListComponent, ShowComponent]
})

export class CommandeModule { }
