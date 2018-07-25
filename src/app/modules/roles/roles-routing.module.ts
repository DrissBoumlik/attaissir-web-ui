import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [{
  path: 'roles',
  component: DefaultComponent,
  children: [
    { path: 'ajouter', component: AddComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
