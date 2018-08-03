import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { MouvementsRoutingModule } from './mouvements-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddComponent } from './components/add/add.component';
import { ShowComponent } from './components/show/show.component';
import { ShowRetourComponent } from './components/show-retour/show-retour.component';
import {PermissionDirective} from '../../_directives/permission.directive';
import {PermissionModule} from '../../_directives/permission.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    MouvementsRoutingModule,
    PermissionModule
  ],
  declarations: [ListComponent, AddComponent, ShowComponent, ShowRetourComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MouvementsModule { }
