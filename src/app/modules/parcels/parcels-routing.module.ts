import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
  path: 'parcelles',
  component: DefaultComponent,
  children: [
    { path: 'add', component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.parcels.store'] } },
    { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.parcels.grid'] } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelsRoutingModule { }
