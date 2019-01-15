import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { ConvoationListComponent } from './components/convoation-list/convoation-list.component';
import { EchantillonnageListComponent } from './components/echantillonnage-list/echantillonnage-list.component';
import { EchantillonnageShowComponent } from './components/echantillonnage-show/echantillonnage-show.component';
import { ChargementAffectationListComponent } from './components/chargement-affectation-list/chargement-affectation-list.component';
import { EncodageLisComponent } from './components/encodage-lis/encodage-lis.component';
import {OrderListComponent} from './components/order-list/order-list.component';
import {RotationsListComponent} from './components/rotations-list/rotations-list.component';

const routes: Routes = [{
  path: 'arrachage',
  component: DefaultComponent,
  children: [
    { path: 'ordre', component: OrderListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
    { path: 'convocations', component: ConvoationListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
    { path: 'convocations/generated', component: RotationsListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
    { path: 'encodage/liste', component: EncodageLisComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
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
