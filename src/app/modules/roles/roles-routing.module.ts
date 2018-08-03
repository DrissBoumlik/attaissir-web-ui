import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditeComponent } from './components/edite/edite.component';
import { AuthGuard } from '../../_directives/guard.directive';

const routes: Routes = [{
  path: 'roles',
  component: DefaultComponent,
  children: [
    { path: 'ajouter', component: AddComponent },
    { path: 'liste', component: ListComponent, canActivate : [AuthGuard] , data: { permission: []} },
    { path: 'modifier/:id', component: EditeComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
