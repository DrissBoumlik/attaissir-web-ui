import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
  path: 'incidents',
  component: DefaultComponent,
  children: [
    { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule { }
