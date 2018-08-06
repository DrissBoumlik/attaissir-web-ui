import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ShowComponent } from './components/show/show.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [ 
  {
    path: 'preconisations-intrants',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.articletemplates.grid'] }
      },
      {
        path: 'liste',
        component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.articletemplates.grid'] }
      },
      {
        path: 'liste/:cin',
        component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.articletemplates.show'] }
      },
      {
        path: 'afficher/:id',
        component: ShowComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.articletemplates.show'] }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreconisationsIntrantsRoutingModule { }
