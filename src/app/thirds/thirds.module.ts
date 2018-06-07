import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  DxButtonModule, DxDataGridModule, DxFileUploaderModule, DxRadioGroupModule, DxSelectBoxModule,
  DxSwitchModule, DxTemplateModule
} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { ThirdsRoutingModule } from './thirds-routing.module';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';
import { AvatarModule } from 'ng2-avatar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardsComponent } from './components/cards/cards.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ThirdsRoutingModule,
    DxDataGridModule,
    FormsModule,
    DxButtonModule,
    DxRadioGroupModule,
    NgbModule.forRoot(),
    DxSwitchModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    AvatarModule.forRoot(),
  ],
  exports: [
    FormsModule,
    DxTemplateModule,
    DxDataGridModule
  ],
  declarations: [
    IndexComponent,
    AddComponent,
    EditComponent,
    ShowComponent,
    ListComponent,
    CardsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThirdsModule {
}
