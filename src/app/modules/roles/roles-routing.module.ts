import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditeComponent } from './components/edite/edite.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
  path: 'roles',
  component: DefaultComponent,
  children: [
    { path: 'ajouter', component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['user.roles.store'] } },
    { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['user.roles.grid'] } },
    { path: 'modifier/:id', component: EditeComponent, canActivate: [PermissionGuard], data: { permission: ['user.roles.update'] } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
