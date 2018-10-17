import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { ContractsComponent } from './contracts/contracts.component';
import { ReportingComponent } from './reporting';
import { PreconisationsComponent } from './preconisations/preconisations.component';
import { CardsComponent } from './cards/cards.component';
import { MouvementsComponent } from './mouvements/mouvements.component';

const routes: Routes = [{
  path: 'reporting',
  component: DefaultComponent,
  children: [
    {
      path: '',
      component: ReportingComponent,
      children: [
        {
          path: 'contracts',
          component: ContractsComponent,
          canActivate: [PermissionGuard],
          data: { permission: ['agreement.contracts.grid'] }
        },
        {
          path: 'contracts/cda',
          component: ContractsComponent,
          canActivate: [PermissionGuard],
          data: { permission: ['agreement.contracts.grid'] }
        },
        {
          path: 'cards',
          component: CardsComponent,
          canActivate: [PermissionGuard],
          data: { permission: ['agreement.contracts.grid'] }
        }
        ,
        {
          path: 'preconisations',
          component: PreconisationsComponent,
          canActivate: [PermissionGuard],
          data: { permission: ['agreement.contracts.grid'] }
        },
        {
          path: 'mouvements',
          component: MouvementsComponent,
          canActivate: [PermissionGuard],
          data: { permission: ['agreement.contracts.grid'] }
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule {
}
