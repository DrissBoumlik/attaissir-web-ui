import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {DefaultComponent} from '../../theme/pages/default/default.component';
import {ShowComponent} from './components/show/show.component';
import {PermissionGuard} from '../../shared/directives/guard.directive';
import {PrecoAvanceListComponent} from './components/preco-avance-list/preco-avance-list.component';
import {DetailsComponent} from './components/details/details.component';

const routes: Routes = [
  {
    path: 'preconisations-intrants',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        canActivate: [PermissionGuard],
        data: {permission: ['preconization.interventions.grid']}
      },
      {
        path: 'liste',
        component: ListComponent,
        canActivate: [PermissionGuard],
        data: {permission: ['preconization.interventions.grid']}
      },
      {
        path: 'liste/details',
        component: DetailsComponent,
        canActivate: [PermissionGuard],
        data: {permission: ['preconization.interventions.grid']}
      },
      {
        path: 'liste/:cin',
        component: ListComponent,
        canActivate: [PermissionGuard],
        data: {permission: ['preconization.articletemplates.show']}
      },
      {
        path: 'afficher/:id',
        component: ShowComponent,
        canActivate: [PermissionGuard],
        data: {permission: ['preconization.articletemplates.show']}
      },
      {
        path: 'avance-primes',
        component: PrecoAvanceListComponent,
        canActivate: [PermissionGuard],
        data: {permission: ['preconization.interventions.avance_prime']}
      },
      {
        path: 'avance-prest',
        component: PrecoAvanceListComponent,
        canActivate: [PermissionGuard],
        data: {permission: ['preconization.interventions.avance_prime']}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreconisationsIntrantsRoutingModule {
}
