import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { DxButtonModule, DxListModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTreeViewModule } from 'devextreme-angular';
import { ProfileComponent } from './components/profile/profile.component';
import {AvatarModule} from 'ng2-avatar';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule,
    DxSelectBoxModule,
    DxTreeViewModule,
    DxListModule,
    DxTemplateModule,
    DxPopupModule,
    DxButtonModule,
    AvatarModule.forRoot()
  ],
  declarations: [AddComponent, ListComponent, EditComponent , ProfileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {
}
