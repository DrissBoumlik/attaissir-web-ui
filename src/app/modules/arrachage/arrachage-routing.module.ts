import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { ConvoationListComponent } from './components/convoation-list/convoation-list.component';
import { EchantillonnageListComponent } from './components/echantillonnage-list/echantillonnage-list.component';
import { EchantillonnageShowComponent } from './components/echantillonnage-show/echantillonnage-show.component';
import { ChargementAffectationListComponent } from './components/chargement-affectation-list/chargement-affectation-list.component';

const routes: Routes = [{
  path: 'arrachage',
  component: DefaultComponent,
  children: [
    { path: 'convocations', component: ConvoationListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
    { path: 'chargements', component: ChargementAffectationListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
    { path: 'echantillons', component: EchantillonnageListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
    { path: 'echantillons/:id', component: EchantillonnageShowComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArrachageRoutingModule { }
