import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdsRoutingModule } from './thirds-routing.module';
import { IndexComponent } from './components/index/index.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { DxButtonModule, DxFileUploaderModule, DxFormModule, DxSelectBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ThirdsRoutingModule,
    DxFileUploaderModule
  ],
  exports: [
  ],
  declarations: [
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
