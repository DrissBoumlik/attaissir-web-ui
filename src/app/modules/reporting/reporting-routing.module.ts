import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from '../../theme/pages/default/default.component';
import {PermissionGuard} from '../../shared/directives/guard.directive';
import {ContractsComponent} from './contracts/contracts.component';
import {ReportingComponent} from './reporting';
import {PreconisationsComponent} from './preconisations/preconisations.component';
import {CardsComponent} from './cards/cards.component';
import {MouvementsComponent} from './mouvements/mouvements.component';
import {IlotsComponent} from './ilots/ilots.component';
import {HourlyReceptionComponent} from './harvest/cane/hourly-reception/hourly-reception.component';
import {HourlyReceptionCdaComponent} from './harvest/cane/hourly-reception-cda/hourly-reception-cda.component';
import {ParcelRidelleHistoryComponent} from './harvest/general/parcel-ridelle-history/parcel-ridelle-history.component';
import {AlocationsAndReturnsComponent} from './alocations-and-returns/alocations-and-returns.component';
import {NetDistributionByReceiptComponent} from './net-distribution-by-receipt/net-distribution-by-receipt.component';
import {RotationsPivotComponent} from './harvest/general/rotations-pivot/rotations-pivot.component';
import {SolTrstComponent} from './sol-trst/sol-trst.component';
import {PulpDotationsComponent} from './pulp-dotations/pulp-dotations.component';
import {MaterialAllocationComponent} from './material-allocation/material-allocation.component';

const routes: Routes = [{
    path: 'reporting',
    component: ReportingComponent,
    children: [
        {
            path: 'contracts',
            component: ContractsComponent,
            data: {permission: ['none']}
        },
        {
            path: 'contracts/cda',
            component: ContractsComponent,
            canActivate: [PermissionGuard],
            data: {permission: ['none']}
        },
        {
            path: 'cards',
            component: CardsComponent,
            canActivate: [PermissionGuard],
            data: {permission: ['none']}
        }
        ,
        {
            path: 'alocations',
            component: AlocationsAndReturnsComponent,
            canActivate: [PermissionGuard],
            data: {permission: ['none']}
        },
        {
            path: 'jobs',
            component: SolTrstComponent,
            canActivate: [PermissionGuard],
            data: {permission: ['none']}
        },
        {
            path: 'distributions/net/bon',
            component: NetDistributionByReceiptComponent,
            canActivate: [PermissionGuard],
            data: {permission: ['none']}
        }
        ,
        {
            path: 'preconisations',
            component: PreconisationsComponent,
            canActivate: [PermissionGuard],
            data: {permission: ['none']}
        },
        {
            path: 'mouvements',
            component: MouvementsComponent,
        },
        {
            path: 'ilots',
            component: IlotsComponent,
        },
        {
            path: 'pulp',
            component: PulpDotationsComponent,
        },
        {
            path: 'parcels/loading/history',
            component: ParcelRidelleHistoryComponent,
        },
        {
            path: 'receptions/cane/hourly',
            component: HourlyReceptionComponent,
        },
        {
            path: 'receptions/cane/hourly/cda',
            component: HourlyReceptionCdaComponent,
        },
        {
            path: 'receptions/daily',
            component: RotationsPivotComponent,
        },
        {
            path: 'material/allocations',
            component: MaterialAllocationComponent,
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportingRoutingModule {
}
