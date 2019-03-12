import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { ContractsComponent } from './contracts/contracts.component';
import { ReportingComponent } from './reporting';
import { PreconisationsComponent } from './preconisations/preconisations.component';
import { CardsComponent } from './cards/cards.component';
import { MouvementsComponent } from './mouvements/mouvements.component';
import { IlotsComponent } from './ilots/ilots.component';
import { HourlyReceptionComponent } from './harvest/cane/hourly-reception/hourly-reception.component';

const routes: Routes = [{
    path: 'reporting',
    component: ReportingComponent,
    children: [
        {
            path: 'contracts',
            component: ContractsComponent,
            data: { permission: ['none'] }
        },
        {
            path: 'contracts/cda',
            component: ContractsComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['none'] }
        },
        {
            path: 'cards',
            component: CardsComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['none'] }
        }
        ,
        {
            path: 'preconisations',
            component: PreconisationsComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['none'] }
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
            path: 'receptions/cane/hourly',
            component: HourlyReceptionComponent,
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportingRoutingModule {
}
