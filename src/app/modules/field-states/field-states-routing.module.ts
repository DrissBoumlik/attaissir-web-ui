import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { DefaultComponent } from '../../theme/pages/default/default.component';

const routes: Routes = [{
  path: 'fieldstates',
  component: DefaultComponent,
  children: [
    { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldStatesRoutingModule { }
