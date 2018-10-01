import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { ShowComponent } from './components/show/show.component';
import { ShowRetourComponent } from './components/show-retour/show-retour.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { DetailsComponent } from './components/details/details.component';



const routes: Routes = [
  {
    path: 'mouvements',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.grid'] }
      },
      {
        path: 'liste',
        component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.grid'] }
      },
      {
        path: 'liste/details',
        component: DetailsComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.grid'] }
      },
      {
        path: 'ajouter',
        component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.update'] }
      },
      {
        path: 'afficher/:id',
        component: ShowComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.update'] }
      },
      {
        path: 'retour/:id',
        component: ShowRetourComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.show'] }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MouvementsRoutingModule { }
