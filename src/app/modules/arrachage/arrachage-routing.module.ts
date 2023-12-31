import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { ConvoationListComponent } from './components/convoation-list/convoation-list.component';
import { EchantillonnageListComponent } from './components/echantillonnage-list/echantillonnage-list.component';
import { EchantillonnageShowComponent } from './components/echantillonnage-show/echantillonnage-show.component';
import { ChargementAffectationListComponent } from './components/chargement-affectation-list/chargement-affectation-list.component';
import { EncodageLisComponent } from './components/encodage-lis/encodage-lis.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RotationsListComponent } from './components/rotations-list/rotations-list.component';
import { TruckLineupComponent } from './components/truck-lineup/truck-lineup.component';
import {RotationsInprogressListComponent} from './components/rotations-inprogress-list/rotations-inprogress-list.component';
import {RotationsAwaitingListComponent} from './components/rotations-awaiting-list/rotations-awaiting-list.component';
import {LoaderParcelAssingmentListComponent} from './components/loader-parcel-assingment-list/loader-parcel-assingment-list.component';
import {OperatedRotationsTodayComponent} from './components/operated-rotations-today/operated-rotations-today.component';

const routes: Routes = [{
    path: 'arrachage',
    children: [
        { path: 'ordre', component: OrderListComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.order.view'] } },
        { path: 'convocations', component: ConvoationListComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.generate.view'] } },
        { path: 'convocations/generated', component: RotationsListComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.rotations.usinage'] } },
        { path: 'rotations/inprogress', component: RotationsInprogressListComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.rotations.inprogress'] } },
        { path: 'rotations/awaiting', component: RotationsAwaitingListComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.rotations.awaiting'] } },
        { path: 'rotations/today', component: OperatedRotationsTodayComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.rotations.usinage'] } },
        { path: 'encodage/liste', component: EncodageLisComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
        { path: 'chargements', component: ChargementAffectationListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
        { path: 'echantillons', component: EchantillonnageListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.interventions.sampling'] } },
        { path: 'echantillons/:id', component: EchantillonnageShowComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.interventions.sampling'] } },
        { path: 'truck/lineup', component: TruckLineupComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.rotations.queue'] } },
        { path: 'loader/parcel/assignments', component: LoaderParcelAssingmentListComponent, canActivate: [PermissionGuard], data: { permission: ['convocations.rotations.usinage'] } }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArrachageRoutingModule { }
