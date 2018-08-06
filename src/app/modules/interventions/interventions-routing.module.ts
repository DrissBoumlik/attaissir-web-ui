import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NewComponent } from './components/new/new.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { AddTempleteComponent } from './components/add-templete/add-templete.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
  path: 'interventions',
  component: DefaultComponent,
  children: [
    { path: 'selectionner', component: NewComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.interventions.store'] } },
    { path: 'ajouter', component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.interventions.store'] } },
    { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.interventions.grid'] } },
    { path: 'modifier/:id', component: EditComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.interventions.update'] } },
    {
      path: 'appliquer-template-parcelle', component: AddTempleteComponent,
      canActivate: [PermissionGuard], data: { permission: ['preconization.articletemplates.store'] }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InterventionsRoutingModule { }
