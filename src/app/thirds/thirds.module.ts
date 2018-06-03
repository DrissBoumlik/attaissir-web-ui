import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  DxButtonModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxRadioGroupModule, DxSelectBoxModule,
  DxSwitchModule, DxTemplateModule
} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { ThirdsRoutingModule } from './thirds-routing.module';
import { TiersFormComponent } from './components/tiers-form/tiers-form.component';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';
import { AvatarModule } from 'ng2-avatar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ThirdsRoutingModule,
    DxDataGridModule,
    DxFormModule,
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
    TiersFormComponent,
    DxFormModule,
    FormsModule,
    DxTemplateModule,
    DxDataGridModule
  ],
  declarations: [
    TiersFormComponent,
    IndexComponent,
    AddComponent,
    EditComponent,
    ShowComponent,
    ListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThirdsModule {
}
